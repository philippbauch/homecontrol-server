const { db } = require("../../../db");

const CONTEXT = "get_room";

async function getRoom(req, res) {
  const { _id } = req.getRoom;
  const { _id: userId } = req.user;

  try {
    let room = await db.rooms.findOne({ _id });

    if (!room) {
      return res.error.roomDoesntExist(CONTEXT);
    }

    return res.success(room);
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }
}

module.exports = { CONTEXT, getRoom };
