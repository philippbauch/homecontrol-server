const { db } = require("../../../db");
const { INTERNAL_ERROR } = require("../../../errors");

const CONTEXT = "get_homes";

async function getHomes(req, res) {
  const { _id: userId } = req.user;

  try {
    let homes = await db.homes.find({ userId }).toArray();

    return res.success(homes);
  } catch (error) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }
}

module.exports = { CONTEXT, getHomes };
