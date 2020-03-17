const { db } = require("../../db");
const {
  InternalError,
  InvitationDoesntExistError,
  PermissionDeniedError
} = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "delete_invitation";

const deleteInvitation = wrapAsync(async function(req, res) {
  const { invitationId } = req.params;
  const { _id: userId } = req.user;

  const invitation = await db.invitations.findOne({ _id: invitationId });

  if (!invitation) {
    throw new InvitationDoesntExistError();
  }

  let home = await db.homes.findOne({ _id: invitation.homeId });

  if (!home) {
    throw new InternalError();
  }

  if (!home.residents.some(resident => resident._id.equals(userId) && resident.owner)) {
    throw new PermissionDeniedError();
  }

  const { result } = await db.invitations.deleteOne({ _id: invitationId });

  if (!result.ok) {
    throw new InternalError();
  }

  res.success({ _id: invitationId });
}, CONTEXT);

module.exports = { CONTEXT, deleteInvitation };
