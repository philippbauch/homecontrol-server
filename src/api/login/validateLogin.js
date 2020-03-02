const CONTEXT = "validate_login";

function validateLogin(req, res, next) {
  const { identifier, password } = req.body;

  if (!identifier) {
    res.error.missingRequiredField(CONTEXT, "identifier");
    return;
  }

  if (!password) {
    res.error.missingRequiredField(CONTEXT, "password");
    return;
  }

  req.login = {
    identifier,
    password
  };

  next();
}

module.exports = { CONTEXT, validateLogin };
