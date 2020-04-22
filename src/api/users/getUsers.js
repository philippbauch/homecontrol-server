const db = require("../../database");
const { wrapAsync } = require("../../utils");

const CONTEXT = "get_users";

const getUsers = wrapAsync(async function(req, res) {
  let users = await db.users
    .find({})
    .project({ hash: 0 })
    .toArray();

  return res.success(users);
}, CONTEXT);

module.exports = { CONTEXT, getUsers };
