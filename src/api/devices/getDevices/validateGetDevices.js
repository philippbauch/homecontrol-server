const CONTEXT = "validate_get_devices";

function validateGetDevices(req, res, next) {
  // Add validation here

  next();
}

module.exports = { CONTEXT, validateGetDevices };
