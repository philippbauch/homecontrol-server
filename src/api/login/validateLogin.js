const { MISSING_REQUIRED_FIELD, PASSWORD_TOO_SHORT } = require("../../errors");

const CONTEXT = "validate_login";

function validateLogin(req, res, next) {
  const { identifier, password } = req.body;

  if (!identifier) {
    res.failure(MISSING_REQUIRED_FIELD("identifier", CONTEXT));
    return;
  }

  if (!password) {
    res.failure(MISSING_REQUIRED_FIELD("password", CONTEXT));
    return;
  }

  if (password.length < 8) {
    res.failure(PASSWORD_TOO_SHORT);
    return;
  }

  req.login = {
    identifier,
    password
  };

  next();
}

module.exports = { CONTEXT, validateLogin };
