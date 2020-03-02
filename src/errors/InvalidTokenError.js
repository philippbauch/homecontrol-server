const ApiError = require("./ApiError");

class InvalidTokenError extends ApiError {
  constructor(domain) {
    const code = 400;
    const id = "ERR_INVALID_TOKEN";
    const message = "The token is invalid";

    super({
      code,
      domain,
      id,
      message
    });
  }
}

module.exports = InvalidTokenError;
