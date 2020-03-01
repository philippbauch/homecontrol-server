const { db } = require("../../../db");
const { INTERNAL_ERROR } = require("../../../errors");

const CONTEXT = "get_home";

async function getHome(req, res) {
  const { _id } = req.getHome;
  const { _id: userId } = req.user;

  try {
    let home = await db.homes.findOne({ _id });

    if (!home) {
      return res.failure("Home does not exist.");
    } else if (!home.userId.equals(userId)) {
      return res.failure("Permission denied.");
    } else {
      return res.success(home);
    }
  } catch (error) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }
}

module.exports = { CONTEXT, getHome };
