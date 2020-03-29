const { db } = require("../../db");
const {
  InternalError,
  PermissionDeniedError,
  UserDoesntExistError
} = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "delete_user";

const deleteUser = wrapAsync(async function(req, res) {
  const { userId } = req.params;
  const { _id, admin } = req.user;

  if (!admin && !userId.equals(_id)) {
    throw new PermissionDeniedError();
  }

  const user = await db.users.findOne({ _id: userId });

  if (!user) {
    throw new UserDoesntExistError();
  }

  const { result } = await db.users.deleteOne({ _id: userId });

  if (!result.ok) {
    throw new InternalError();
  }

  res.success({ _id: userId });
}, CONTEXT);

module.exports = { CONTEXT, deleteUser };
