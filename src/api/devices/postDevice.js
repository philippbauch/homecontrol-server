const { db } = require("../../db");
const {
  DeviceAlreadyExistsError,
  MissingRequiredFieldError
} = require("../../errors");
const { wrapAsync } = require("../../utils");

const CONTEXT = "post_device";

const postDevice = wrapAsync(async function(req, res) {
  const { name } = req.body;

  if (!name) {
    throw new MissingRequiredFieldError("name");
  }

  const existingDevice = await db.devices.findOne({ name });

  if (existingDevice) {
    throw new DeviceAlreadyExistsError();
  }

  const apiKey = null;

  const { insertedId: _id } = await db.devices.insertOne({
    name,
    apiKey
  });

  res.success({ _id });
}, CONTEXT);

module.exports = { CONTEXT, postDevice };
