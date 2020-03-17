const { db } = require("../../db");
const { wrapAsync } = require("../../utils");

const CONTEXT = "get_homes";

const getHomes = wrapAsync(async function(req, res) {
  const { _id: userId } = req.user;

  let homes = await db.homes.find({ "residents._id": userId }).toArray();

  return res.success(homes);
}, CONTEXT);

module.exports = { CONTEXT, getHomes };
