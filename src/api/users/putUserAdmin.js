const { db } = require("../../db");
const {
  InternalError,
  MissingRequiredFieldError,
  UserDoesntExistError
} = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "put_user";

const putUserAdmin = wrapAsync(async function(req, res) {
  const { admin } = req.body;
  const { userId } = req.params;

  if (typeof admin === "undefined") {
    throw new MissingRequiredFieldError("admin");
  }

  const user = await db.users.findOne({ _id: userId });

  if (!user) {
    throw new UserDoesntExistError();
  }

  const { result } = await db.users.updateOne(
    { _id: userId },
    { $set: { admin } }
  );

  if (!result.ok) {
    throw new InternalError();
  }

  res.success({ _id: userId, admin });
}, CONTEXT);

module.exports = { CONTEXT, putUserAdmin };
