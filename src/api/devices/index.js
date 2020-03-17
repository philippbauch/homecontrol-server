const { getDevice } = require("./getDevice");
const { getDevicesInHome } = require("./getDevicesInHome");
const { getDevicesInRoom } = require("./getDevicesInRoom");
const { postDevice } = require("./postDevice");

module.exports = {
  getDevice,
  getDevicesInHome,
  getDevicesInRoom,
  postDevice
};
