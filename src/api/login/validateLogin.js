const { MISSING_REQUIRED_FIELD } = require("../../errors");

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

  req.login = {
    identifier,
    password
  };

  next();
}

module.exports = { CONTEXT, validateLogin };
