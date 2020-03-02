const bcrypt = require("bcrypt");
const { db } = require("../../../db");

const CONTEXT = "post_user";

const SALT_ROUNDS = 12;

async function postUser(req, res) {
  const { identifier, password } = req.postUser;

  try {
    const existingUser = await db.users.findOne({ identifier });

    if (existingUser) {
      return res.error.userAlreadyExists(CONTEXT);
    }
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }

  let hash;

  try {
    hash = await bcrypt.hash(password, SALT_ROUNDS);
  } catch (error) {
    return res.error.internalError(CONTEXT);
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
    return res.error.internalError(CONTEXT);
  }
}

module.exports = { CONTEXT, postUser };
