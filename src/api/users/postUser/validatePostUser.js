const {
  MISSING_REQUIRED_FIELD,
  PASSWORD_TOO_SHORT
} = require("../../../errors");
const { isAlphanumeric } = require("../../../utils");

const CONTEXT = "validate_post_user";

function validatePostUser(req, res, next) {
  const { identifier, password } = req.body;

  if (!identifier) {
    res.failure(MISSING_REQUIRED_FIELD("identifier", CONTEXT));
    return;
  }

  if (!isAlphanumeric(identifier)) {
    res.failure("Identifier contains invalid characters.");
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

  req.postUser = {
    identifier,
    password
  };

  next();
}

module.exports = { CONTEXT, validatePostUser };
