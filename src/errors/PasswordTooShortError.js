const ApiError = require("./ApiError");

class PasswordTooShortError extends ApiError {
  constructor(domain) {
    const code = 400;
    const id = "ERR_PASSWORD_TOO_SHORT";
    const message = "Password must have at least 8 characters";

    super({
      code,
      domain,
      id,
      message
    });
  }
}

module.exports = PasswordTooShortError;
