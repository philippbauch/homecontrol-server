const { db } = require("../../../db");
const { INTERNAL_ERROR, USER_DOESNT_EXIST } = require("../../../errors");

const CONTEXT = "get_user";

async function getUser(req, res) {
  const { _id } = req.getUser;

  try {
    let user = await db.users.findOne({ _id }, { projection: { hash: 0 } });

    if (!user) {
      return res.failure(USER_DOESNT_EXIST(CONTEXT));
    } else {
      return res.success(user);
    }
  } catch (error) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }
}

module.exports = { CONTEXT, getUser };
