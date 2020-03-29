const bcrypt = require("bcrypt");
const { db } = require("../../db");
const {
  MissingRequiredFieldError,
  PasswordTooShortError,
  UserAlreadyExistsError
} = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "post_user";

const SALT_ROUNDS = 12;

const postUser = wrapAsync(async function(req, res) {
  let { admin, identifier, password } = req.body;

  if (!identifier) {
    throw new MissingRequiredFieldError("identifier");
  }

  if (!password) {
    throw new MissingRequiredFieldError("password");
  }

  if (password.length < 8) {
    throw new PasswordTooShortError();
  }

  if (!admin) {
    admin = false;
  }

  const existingUser = await db.users.findOne({ identifier });

  if (existingUser) {
    throw new UserAlreadyExistsError();
  }

  let hash = await bcrypt.hash(password, SALT_ROUNDS);

  const locked = false;
  const preferences = {};

  const { insertedId: _id } = await db.users.insertOne({
    identifier,
    hash,
    admin,
    locked,
    preferences
  });

  res.success({ _id });
}, CONTEXT);

module.exports = { CONTEXT, postUser };
