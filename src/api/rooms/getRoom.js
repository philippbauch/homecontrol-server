const { db } = require("../../db");

const CONTEXT = "get_room";

async function getRoom(req, res) {
  const { roomId } = req.params;
  const { _id: userId } = req.user;

  try {
    const room = await db.rooms.findOne({ _id: roomId });

    if (!room) {
      return res.error.roomDoesntExist(CONTEXT);
    }

    const home = await db.homes.findOne({ _id: room.homeId, residents: userId });

    if (!home) {
      return res.error.permissionDenied(CONTEXT);
    }

    return res.success(room);
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }
}

module.exports = { CONTEXT, getRoom };
