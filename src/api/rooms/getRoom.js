const db = require("../../database");
const { PermissionDeniedError, RoomDoesntExistError } = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "get_room";

const getRoom = wrapAsync(async function(req, res) {
  const { roomId } = req.params;
  const { _id: userId } = req.user;

  const room = await db.rooms.findOne({ _id: roomId });

  if (!room) {
    throw new RoomDoesntExistError();
  }

  const home = await db.homes.findOne({ _id: room.homeId, "residents._id": userId });

  if (!home) {
    throw new PermissionDeniedError();
  }

  return res.success(room);
}, CONTEXT);

module.exports = { CONTEXT, getRoom };
