const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../../db");

const CONTEXT = "login";

async function login(req, res) {
  const { identifier, password } = req.login;

  let user;

  try {
    user = await db.users.findOne({ identifier });

    if (!user) {
      return res.error.userDoesntExist(CONTEXT);
    }
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }

  const { _id, hash, admin, locked } = user;

  try {
    const equal = await bcrypt.compare(password, hash);

    if (!equal) {
      return res.error.incorrectPassword(CONTEXT);
    }
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }

  if (locked) {
    return res.error.userLocked(CONTEXT);
  }

  const userPayload = {
    _id,
    identifier,
    admin
  };

  try {
    const token = await jwt.sign({ user: userPayload }, "secret", {
      expiresIn: "1 days"
    });

    if (!token) {
      return res.error.internalError(CONTEXT);
    }

    return res.success({ _id, token });
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }
}

module.exports = { CONTEXT, login };
