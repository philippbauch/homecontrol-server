const bcrypt = require("bcrypt");
const { db } = require("../../db");
const {
  InvalidIdentifierError,
  MissingRequiredFieldError,
  PasswordTooShortError,
  UserAlreadyExistsError
} = require("../../errors");
const { isAlphanumeric, wrapAsync } = require("../../utils");

const CONTEXT = "post_user";

const SALT_ROUNDS = 12;

const postUser = wrapAsync(async function(req, res) {
  const { identifier, password } = req.body;

  if (!identifier) {
    throw new MissingRequiredFieldError("identifier");
  }

  if (!isAlphanumeric(identifier)) {
    throw new InvalidIdentifierError();
  }

  if (!password) {
    throw new MissingRequiredFieldError("password");
  }

  if (password.length < 8) {
    throw new PasswordTooShortError();
  }

  const existingUser = await db.users.findOne({ identifier });

  if (existingUser) {
    throw new UserAlreadyExistsError();
  }

  let hash = await bcrypt.hash(password, SALT_ROUNDS);

  const isAdmin = false;
  const isLocked = false;
  const preferences = {};

  const { insertedId: _id } = await db.users.insertOne({
    identifier,
    hash,
    admin: isAdmin,
    locked: isLocked,
    preferences
  });

  res.success({ _id });
}, CONTEXT);

module.exports = { CONTEXT, postUser };
