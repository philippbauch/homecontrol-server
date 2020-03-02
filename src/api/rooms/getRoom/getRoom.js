const { db } = require("../../../db");

const CONTEXT = "get_device";

async function getRoom(req, res) {
  const { _id } = req.getRoom;
  const { _id: userId } = req.user;

  try {
    let room = await db.rooms.findOne({ _id });

    if (!room) {
      return res.error.roomDoesntExist(CONTEXT);
    } else if (!room.userId.equals(userId)) {
      return res.error.permissionDenied(CONTEXT);
    } else {
      return res.success(room);
    }
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }
}

module.exports = { CONTEXT, getRoom };
