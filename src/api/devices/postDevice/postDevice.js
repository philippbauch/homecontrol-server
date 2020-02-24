const { db } = require("../../../db");
const { INTERNAL_ERROR } = require("../../../errors");

const CONTEXT = "post_device";

async function postDevice(req, res) {
  const { name } = req.postDevice;

  try {
    const existingDevice = await db.devices.findOne({ name });

    if (existingDevice) {
      return res.failure("A device with this name already exists.");
    }
  } catch (error) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }

  const apiKey = null;

  try {
    const { insertedId: _id } = await db.devices.insertOne({
      name,
      apiKey
    });

    res.success({ _id });
  } catch (error) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }
}

module.exports = { CONTEXT, postDevice };
