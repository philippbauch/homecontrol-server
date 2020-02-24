const { getDevice, validateGetDevice } = require("./getDevice");
const { getDevices, validateGetDevices } = require("./getDevices");
const { postDevice, validatePostDevice } = require("./postDevice");

module.exports = {
  getDevice,
  getDevices,
  postDevice,
  validateGetDevice,
  validateGetDevices,
  validatePostDevice
};
