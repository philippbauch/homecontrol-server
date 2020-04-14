const { db } = require("../../db");
const {
  HomeDoesntExistError,
  MissingRequiredFieldError,
  PendingInvitationError,
  PermissionDeniedError,
  ResidentAlreadyExistsError,
  UserDoesntExistError
} = require("../../errors");
const { wrapAsync } = require("../../utils");
const { ws } = require("../../ws");

const CONTEXT = "post_invitation";

const postInvitation = wrapAsync(async function(req, res) {
  const { homeId, inviteeIdentifier } = req.body;
  const { _id: inviterId } = req.user;

  if (!homeId) {
    throw new MissingRequiredFieldError("homeId");
  }

  if (!inviteeIdentifier) {
    throw new MissingRequiredFieldError("inviteeIdentifier");
  }

  let home = await db.homes.findOne({ _id: homeId });

  if (!home) {
    throw new HomeDoesntExistError();
  }

  if (!home.residents.some(resident => resident._id.equals(inviterId) && resident.owner)) {
    throw new PermissionDeniedError();
  }

  const invitee = await db.users.findOne({ identifier: inviteeIdentifier });

  if (!invitee) {
    throw new UserDoesntExistError();
  }

  if (home.residents.some(resident => resident._id.equals(invitee._id))) {
    throw new ResidentAlreadyExistsError();
  }

  const pendingInvitation = await db.invitations.findOne({ homeId, inviteeId: invitee._id, pending: true });

  if (pendingInvitation) {
    throw new PendingInvitationError();
  }

  const { ops } = await db.invitations.insertOne({
    homeId,
    inviteeId: invitee._id,
    inviterId,
    accepted: false,
    pending: true
  });

  const invitation = ops[0];

  ws.findClient(invitee._id).sendInvitation(invitation);

  res.success({ invitation });
}, CONTEXT);

module.exports = { CONTEXT, postInvitation };
