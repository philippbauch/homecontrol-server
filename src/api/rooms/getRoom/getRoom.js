const { db } = require("../../../db");
const { INTERNAL_ERROR } = require("../../../errors");

const CONTEXT = "get_device";

async function getRoom(req, res) {
  const { _id } = req.getRoom;
  const { _id: userId } = req.user;

  try {
    let room = await db.rooms.findOne({ _id });

    if (!room) {
      return res.failure("Room does not exist.");
    } else if (!room.userId.equals(userId)) {
      return res.failure("Permission denied.");
    } else {
      return res.success(room);
    }
  } catch (error) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }
}

module.exports = { CONTEXT, getRoom };
