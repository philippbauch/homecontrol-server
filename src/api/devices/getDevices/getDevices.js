const { db } = require("../../../db");
const { INTERNAL_ERROR } = require("../../../errors");

const CONTEXT = "get_devices";

async function getDevices(req, res) {
  try {
    let devices = await db.devices.find({}).toArray();

    return res.success(devices);
  } catch (error) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }
}

module.exports = { CONTEXT, getDevices };
