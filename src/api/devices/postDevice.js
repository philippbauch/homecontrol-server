const db = require("../../database");
const {
  DeviceAlreadyExistsError,
  HomeDoesntExistError,
  MissingRequiredFieldError,
  PermissionDeniedError,
  RoomDoesntExistError
} = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "post_device";

const postDevice = wrapAsync(async function(req, res) {
  const { roomId } = req.params;
  const { name } = req.body;
  const { _id: userId } = req.user;

  if (!name) {
    throw new MissingRequiredFieldError("name");
  }

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

  const existingDevice = await db.devices.findOne({ name, roomId });

  if (existingDevice) {
    throw new DeviceAlreadyExistsError();
  }

  const apiKey = null;

  const { insertedId: _id } = await db.devices.insertOne({
    apiKey,
    name,
    roomId
  });

  res.success({ _id });
}, CONTEXT);

module.exports = { CONTEXT, postDevice };
