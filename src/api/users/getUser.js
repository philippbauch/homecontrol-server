const { db } = require("../../db");
const { UserDoesntExistError } = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "get_user";

const getUser = wrapAsync(async function(req, res) {
  const { userId } = req.params;

  let user = await db.users.findOne({ _id: userId }, { projection: { hash: 0 } });

  if (!user) {
    throw new UserDoesntExistError();
  } else {
    return res.success(user);
  }
}, CONTEXT);

module.exports = { CONTEXT, getUser };
