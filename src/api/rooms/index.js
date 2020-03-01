const { getRoom, validateGetRoom } = require("./getRoom");
const { getRooms, validateGetRooms } = require("./getRooms");
const { postRoom, validatePostRoom } = require("./postRoom");

module.exports = {
  getRoom,
  getRooms,
  postRoom,
  validateGetRoom,
  validateGetRooms,
  validatePostRoom
};
