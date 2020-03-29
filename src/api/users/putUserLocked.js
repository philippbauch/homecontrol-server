const { db } = require("../../db");
const {
  InternalError,
  MissingRequiredFieldError,
  UserDoesntExistError
} = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "put_user";

const putUserLocked = wrapAsync(async function(req, res) {
  const { locked } = req.body;
  const { userId } = req.params;

  if (typeof locked === "undefined") {
    throw new MissingRequiredFieldError("locked");
  }

  const user = await db.users.findOne({ _id: userId });

  if (!user) {
    throw new UserDoesntExistError();
  }

  const { result } = await db.users.updateOne(
    { _id: userId },
    { $set: { locked } }
  );

  if (!result.ok) {
    throw new InternalError();
  }

  res.success({ _id: userId });
}, CONTEXT);

module.exports = { CONTEXT, putUserLocked };
