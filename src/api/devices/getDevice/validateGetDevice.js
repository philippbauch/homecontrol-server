const { MISSING_PARAM } = require("../../../errors");

const CONTEXT = "validate_get_device";

function validateGetDevice(req, res, next) {
  const { deviceId } = req.params;

  if (!deviceId) {
    return res.failure(MISSING_PARAM("deviceId", CONTEXT));
  }

  req.getDevice = {
    _id: deviceId
  };

  next();
}

module.exports = { CONTEXT, validateGetDevice };
