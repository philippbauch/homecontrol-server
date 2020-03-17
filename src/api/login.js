const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../db");
const {
  IncorrectPasswordError,
  InternalError,
  MissingRequiredFieldError,
  UserDoesntExistError,
  UserLockedError
} = require("../errors");
const { wrapAsync } = require("../utils");

const CONTEXT = "login";

const login = wrapAsync(async function(req, res) {
  const { identifier, password } = req.body;

  if (!identifier) {
    throw new MissingRequiredFieldError("identifier");
  }

  if (!password) {
    throw new MissingRequiredFieldError("password");
  }

  let user = await db.users.findOne({ identifier });

  if (!user) {
    throw new UserDoesntExistError();
  }

  const { _id, hash, admin, locked } = user;

  const equal = await bcrypt.compare(password, hash);

  if (!equal) {
    throw new IncorrectPasswordError();
  }

  if (locked) {
    throw new UserLockedError();
  }

  const token = await jwt.sign({_id}, "secret", {
    expiresIn: "1 days"
  });

  if (!token) {
    throw new InternalError();
  }

  return res.success({ _id, token });
}, CONTEXT);

module.exports = { CONTEXT, login };
