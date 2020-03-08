const { db } = require("../../db");
const { DeviceDoesntExistError } = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "get_device";

const getDevice = wrapAsync(async function(req, res) {
  const { deviceId } = req.params;

  let device = await db.devices.findOne({ _id: deviceId });

  if (!device) {
    throw new DeviceDoesntExistError();
  } else {
    return res.success(device);
  }
}, CONTEXT);

module.exports = { CONTEXT, getDevice };
