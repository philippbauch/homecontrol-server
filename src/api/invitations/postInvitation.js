const db = require("../../database");
const {
  HomeDoesntExistError,
  MissingRequiredFieldError,
  PendingInvitationError,
  PermissionDeniedError,
  ResidentAlreadyExistsError,
  UserDoesntExistError
} = require("../../errors");
const { wrapAsync } = require("../../utils");
const ws = require("../../websocket");

const CONTEXT = "post_invitation";

const postInvitation = wrapAsync(async function(req, res) {
  const { homeId, inviteeIdentifier } = req.body;
  const { _id: inviterId, identifier: inviterIdentifier  } = req.user;

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

  const { insertedId: _id } = await db.invitations.insertOne({
    homeId,
    inviteeId: invitee._id,
    inviterId,
    accepted: false,
    pending: true
  });

  const invitation = {
    _id,
    home: {
      _id: home._id,
      name: home.name
    },
    invitee: {
      _id: invitee._id,
      identifier: invitee.identifier
    },
    inviter: {
      _id: inviterId,
      identifier: inviterIdentifier
    }
  };

  ws.to(invitee._id).emit("invitation", invitation);

  res.success({ invitation });
}, CONTEXT);

module.exports = { CONTEXT, postInvitation };
