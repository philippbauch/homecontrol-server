const { db } = require("../../db");

const CONTEXT = "get_home";

async function getHome(req, res) {
  const { homeId } = req.params;
  const { _id: userId } = req.user;

  try {
    let home = await db.homes.findOne({ _id: homeId, residents: userId });

    if (!home) {
      return res.error.homeDoesntExist(CONTEXT);
    }

    return res.success(home);
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }
}

module.exports = { CONTEXT, getHome };
