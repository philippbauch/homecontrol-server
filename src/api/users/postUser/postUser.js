const bcrypt = require("bcrypt");
const { db } = require("../../../db");
const { INTERNAL_ERROR, USER_ALREADY_EXISTS } = require("../../../errors");

const CONTEXT = "post_user";

const SALT_ROUNDS = 12;

async function postUser(req, res) {
  const { identifier, password } = req.postUser;

  try {
    const existingUser = await db.users.findOne({ identifier });

    if (existingUser) {
      return res.failure(USER_ALREADY_EXISTS);
    }
  } catch (error) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }

  let hash;

  try {
    hash = await bcrypt.hash(password, SALT_ROUNDS);
  } catch (error) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }

  const isAdmin = false;
  const isLocked = false;

  try {
    const { insertedId: _id } = await db.users.insertOne({
      identifier,
      hash,
      admin: isAdmin,
      locked: isLocked
    });

    res.success({ _id });
  } catch (error) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }
}

module.exports = { CONTEXT, postUser };
