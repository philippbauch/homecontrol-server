const { db } = require("../../db");

const CONTEXT = "post_device";

async function postDevice(req, res) {
  const { name } = req.body;

  if (!name) {
    res.error.missingRequiredField(CONTEXT, "name");
    return;
  }

  try {
    const existingDevice = await db.devices.findOne({ name });

    if (existingDevice) {
      return res.error.deviceAlreadyExists(CONTEXT);
    }
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }

  const apiKey = null;

  try {
    const { insertedId: _id } = await db.devices.insertOne({
      name,
      apiKey
    });

    res.success({ _id });
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }
}

module.exports = { CONTEXT, postDevice };
