const { db } = require("../../../db");
const { INTERNAL_ERROR } = require("../../../errors");

const CONTEXT = "get_device";

async function getDevice(req, res) {
  const { _id } = req.getDevice;

  try {
    let device = await db.devices.findOne({ _id });

    if (!device) {
      return res.failure("Device does not exist.");
    } else {
      return res.success(device);
    }
  } catch (error) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }
}

module.exports = { CONTEXT, getDevice };
