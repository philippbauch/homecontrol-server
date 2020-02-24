const { MISSING_REQUIRED_FIELD } = require("../../../errors");

const CONTEXT = "validate_post_device";

function validatePostDevice(req, res, next) {
  const { name } = req.body;

  if (!name) {
    res.failure(MISSING_REQUIRED_FIELD("name", CONTEXT));
    return;
  }

  req.postDevice = {
    name
  };

  next();
}

module.exports = { CONTEXT, validatePostDevice };
