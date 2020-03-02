const { db } = require("../../../db");

const CONTEXT = "get_user";

async function getUser(req, res) {
  const { _id } = req.getUser;

  try {
    let user = await db.users.findOne({ _id }, { projection: { hash: 0 } });

    if (!user) {
      return res.error.userDoesntExist(CONTEXT);
    } else {
      return res.success(user);
    }
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }
}

module.exports = { CONTEXT, getUser };
