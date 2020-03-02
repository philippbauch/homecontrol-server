const { db } = require("../../../db");

const CONTEXT = "get_device";

async function getDevice(req, res) {
  const { _id } = req.getDevice;

  try {
    let device = await db.devices.findOne({ _id });

    if (!device) {
      return res.error.deviceDoesntExist(CONTEXT);
    } else {
      return res.success(device);
    }
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }
}

module.exports = { CONTEXT, getDevice };
