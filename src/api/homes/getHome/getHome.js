const { db } = require("../../../db");

const CONTEXT = "get_home";

async function getHome(req, res) {
  const { _id } = req.getHome;
  const { _id: userId } = req.user;

  try {
    let home = await db.homes.findOne({ _id });

    if (!home) {
      return res.error.homeDoesntExist(CONTEXT);
    } else if (!home.userId.equals(userId)) {
      return res.error.permissionDenied(CONTEXT);
    } else {
      return res.success(home);
    }
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }
}

module.exports = { CONTEXT, getHome };
