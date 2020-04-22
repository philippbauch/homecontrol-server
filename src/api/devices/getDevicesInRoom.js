const db = require("../../database");
const { HomeDoesntExistError, PermissionDeniedError, RoomDoesntExistError } = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "get_devices_in_room";

const getDevicesInRoom = wrapAsync(async function (req, res) {
  const { roomId } = req.params;
  const { _id: userId } = req.user;

  const room = await db.rooms.findOne({ _id: roomId });

  if (!room) {
    throw new RoomDoesntExistError();
  }

  const home = await db.homes.findOne({ _id: room.homeId });

  if (!home) {
    throw new HomeDoesntExistError();
  }

  if (!home.residents.some(resident => resident._id.equals(userId))) {
    throw new PermissionDeniedError();
  }

  const devices = await db.devices.find({ roomId }).project({ roomId: 0 }).toArray();

  return res.success(devices);
}, CONTEXT);

module.exports = { CONTEXT, getDevicesInRoom };
