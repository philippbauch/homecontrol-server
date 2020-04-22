const db = require("../../database");
const { HomeDoesntExistError, PermissionDeniedError } = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "get_rooms";

const getRooms = wrapAsync(async function(req, res) {
  const { homeId } = req.params;
  const { _id: userId } = req.user;

  let home = await db.homes.findOne({ _id: homeId });

  if (!home) {
    throw new HomeDoesntExistError();
  }

  if (!home.residents.some(resident => resident._id.equals(userId))) {
    throw new PermissionDeniedError();
  }

  let rooms = await db.rooms.find({ homeId }).toArray();

  return res.success(rooms);
}, CONTEXT);

module.exports = { CONTEXT, getRooms };
