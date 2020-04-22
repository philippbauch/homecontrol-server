const db = require("../../database");
const {
  InternalError,
  InvitationDoesntExistError,
  MissingRequiredFieldError,
  PermissionDeniedError,
  ResolvedInvitationError
} = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "put_invitation";

const putInvitation = wrapAsync(async function(req, res) {
  const { invitationId } = req.params;
  const { accepted } = req.body;
  const { _id: inviteeId } = req.user;

  if (typeof accepted === "undefined") {
    throw new MissingRequiredFieldError("accepted");
  }

  const invitation = await db.invitations.findOne({ _id: invitationId });

  if (!invitation) {
    throw new InvitationDoesntExistError();
  }

  if (!invitation.inviteeId.equals(inviteeId)) {
    throw new PermissionDeniedError();
  }

  if (!invitation.pending) {
    throw new ResolvedInvitationError();
  }

  const home = await db.homes.findOne({ _id: invitation.homeId });

  if (!home) {
    throw new InternalError();
  }

  const { result: updateInvitationResult } = await db.invitations.updateOne(
    { _id: invitationId },
    { $set: { accepted, pending: false } }
  );

  if (!updateInvitationResult.ok) {
    throw new InternalError();
  }

  if (!accepted) {
    return res.success({ _id: invitationId, accepted });
  }

  if (home.residents.some(resident => resident._id.equals(inviteeId))) {
    return res.success({ _id: invitationId, accepted });
  }

  const { result: updateHomeResult } = await db.homes.updateOne(
    { _id: invitation.homeId },
    { $push: { residents: { _id: inviteeId, owner: false } } }
  );

  if (!updateHomeResult.ok) {
    throw new InternalError();
  }

  res.success({ _id: invitationId, accepted });
}, CONTEXT);

module.exports = { CONTEXT, putInvitation };
