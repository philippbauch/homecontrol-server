const { db } = require("../../db");
const { DeviceDoesntExistError, HomeDoesntExistError, PermissionDeniedError, RoomDoesntExistError } = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "get_device";

const getDevice = wrapAsync(async function(req, res) {
  const { deviceId } = req.params;
  const { _id: userId } = req.user;

  let device = await db.devices.findOne({ _id: deviceId });

  if (!device) {
    throw new DeviceDoesntExistError();
  }

  const room = await db.rooms.findOne({ _id: device.roomId });

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

  res.success(device);
}, CONTEXT);

module.exports = { CONTEXT, getDevice };
