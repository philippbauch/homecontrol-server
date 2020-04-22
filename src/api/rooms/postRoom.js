const db = require("../../database");
const {
  HomeDoesntExistError,
  MissingRequiredFieldError,
  PermissionDeniedError,
  RoomAlreadyExistsError
} = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "post_room";

const postRoom = wrapAsync(async function(req, res) {
  const { name } = req.body;
  const { homeId } = req.params;
  const { _id: userId } = req.user;

  if (!name) {
    throw new MissingRequiredFieldError("name");
  }

  let home = await db.homes.findOne({ _id: homeId });

  if (!home) {
    throw new HomeDoesntExistError();
  }

  if (!home.residents.some(resident => resident._id.equals(userId))) {
    throw new PermissionDeniedError();
  }

  const existingRoom = await db.rooms.findOne({ homeId, name });

  if (existingRoom) {
    throw new RoomAlreadyExistsError();
  }

  const { insertedId: _id } = await db.rooms.insertOne({
    homeId,
    name
  });

  res.success({ _id });
}, CONTEXT);

module.exports = { CONTEXT, postRoom };
