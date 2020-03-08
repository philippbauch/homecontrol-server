const ApiError = require("./ApiError");

class InvalidTokenError extends ApiError {
  constructor(value) {
    const code = 400;
    const id = "ERR_INVALID_TOKEN";
    const message = "The token is invalid";

    super({ code, id, message, value });
  }
}

module.exports = InvalidTokenError;
