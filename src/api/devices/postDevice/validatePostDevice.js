const CONTEXT = "validate_post_device";

function validatePostDevice(req, res, next) {
  const { name } = req.body;

  if (!name) {
    res.error.missingRequiredField(CONTEXT, "name");
    return;
  }

  req.postDevice = {
    name
  };

  next();
}

module.exports = { CONTEXT, validatePostDevice };
