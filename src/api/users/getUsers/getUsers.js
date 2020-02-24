const { db } = require("../../../db");
const { INTERNAL_ERROR } = require("../../../errors");

const CONTEXT = "get_users";

async function getUsers(req, res) {
  try {
    let users = await db.users
      .find({})
      .project({ hash: 0 })
      .toArray();

    return res.success(users);
  } catch (error) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }
}

module.exports = { CONTEXT, getUsers };
