const PASSWORD_TOO_SHORT = {
  code: 400,
  id: "ERR_PASSWORD_TOO_SHORT",
  message: "Password must have at least 8 characters.",
  context: "validate_signup"
};

module.exports = PASSWORD_TOO_SHORT;
