const { db } = require("../../db");
const { wrapAsync } = require("../../utils");

const CONTEXT = "get_devices";

const getDevices = wrapAsync(async function (req, res) {
  let devices = await db.devices.find({}).toArray();

  return res.success(devices);
}, CONTEXT);

module.exports = { CONTEXT, getDevices };
