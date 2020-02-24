const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { db } = require("../../db");
const {
  INCORRECT_PASSWORD,
  INTERNAL_ERROR,
  USER_DOESNT_EXIST,
  USER_LOCKED
} = require("../../errors");

const CONTEXT = "login";

async function login(req, res) {
  const { identifier, password } = req.login;

  let user;

  try {
    user = await db.users.findOne({ identifier });

    if (!user) {
      return res.failure(USER_DOESNT_EXIST(CONTEXT));
    }
  } catch (error) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }

  const { _id, hash, admin, locked } = user;

  try {
    const equal = await bcrypt.compare(password, hash);

    if (!equal) {
      return res.failure(INCORRECT_PASSWORD(CONTEXT));
    }
  } catch (error) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }

  if (locked) {
    return res.failure(USER_LOCKED(CONTEXT));
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
      return res.failure(INTERNAL_ERROR(CONTEXT));
    }

    return res.success({ _id, token });
  } catch (error) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }
}

module.exports = { CONTEXT, login };
