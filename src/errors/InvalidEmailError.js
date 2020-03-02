const ApiError = require("./ApiError");

class InvalidEmailError extends ApiError {
  constructor(domain) {
    const code = 400;
    const id = "ERR_INVALID_EMAIL";
    const message = "The email is invalid";

    super({
      code,
      domain,
      id,
      message
    });
  }
}

module.exports = InvalidEmailError;
