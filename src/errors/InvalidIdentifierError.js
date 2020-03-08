const ApiError = require("./ApiError");

class InvalidIdentifierError extends ApiError {
  constructor(value) {
    const code = 400;
    const id = "ERR_INVALID_IDENTIFIER";
    const message = "The identifier is invalid";

    super({ code, id, message, value });
  }
}

module.exports = InvalidIdentifierError;
