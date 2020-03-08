const { db } = require("../../db");

const CONTEXT = "get_devices";

async function getDevices(req, res) {
  try {
    let devices = await db.devices.find({}).toArray();

    return res.success(devices);
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }
}

module.exports = { CONTEXT, getDevices };
