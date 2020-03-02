const CONTEXT = "validate_get_device";

function validateGetDevice(req, res, next) {
  const { deviceId } = req.params;

  if (!deviceId) {
    return res.error.missingParam(CONTEXT, "deviceId");
  }

  req.getDevice = {
    _id: deviceId
  };

  next();
}

module.exports = { CONTEXT, validateGetDevice };
