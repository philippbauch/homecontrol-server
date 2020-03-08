const { db } = require("../../db");

const CONTEXT = "get_homes";

async function getHomes(req, res) {
  const { _id: userId } = req.user;

  try {
    let homes = await db.homes.find({ residents: userId }).toArray();

    return res.success(homes);
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }
}

module.exports = { CONTEXT, getHomes };
