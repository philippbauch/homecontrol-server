const { isAlphanumeric } = require("../../../utils");

const CONTEXT = "validate_post_user";

function validatePostUser(req, res, next) {
  const { identifier, password } = req.body;

  if (!identifier) {
    res.error.missingRequiredField(CONTEXT, "identifier");
    return;
  }

  if (!isAlphanumeric(identifier)) {
    res.error.invalidIdentifier(CONTEXT);
    return;
  }

  if (!password) {
    res.error.missingRequiredField(CONTEXT, "password");
    return;
  }

  if (password.length < 8) {
    res.error.passwordTooShort(CONTEXT);
    return;
  }

  req.postUser = {
    identifier,
    password
  };

  next();
}

module.exports = { CONTEXT, validatePostUser };
