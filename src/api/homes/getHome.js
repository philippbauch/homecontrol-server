const { db } = require("../../db");
const { HomeDoesntExistError } = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "get_home";

const getHome = wrapAsync(async function(req, res) {
  const { homeId } = req.params;
  const { _id: userId } = req.user;

  let home = await db.homes.findOne({ _id: homeId, residents: userId });

  if (!home) {
    throw new HomeDoesntExistError();
  }

  return res.success(home);
}, CONTEXT);

module.exports = { CONTEXT, getHome };
