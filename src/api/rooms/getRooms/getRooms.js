const { db } = require("../../../db");
const { INTERNAL_ERROR } = require("../../../errors");

const CONTEXT = "get_rooms";

async function getRooms(req, res) {
  const { _id: userId } = req.user;

  try {
    let rooms = await db.rooms.find({ userId }).toArray();

    return res.success(rooms);
  } catch (error) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }
}

module.exports = { CONTEXT, getRooms };
