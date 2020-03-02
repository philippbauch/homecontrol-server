const ApiError = require("./ApiError");

class InvalidIdentifierError extends ApiError {
  constructor(domain) {
    const code = 400;
    const id = "ERR_INVALID_IDENTIFIER";
    const message = "The identifier is invalid";

    super({
      code,
      domain,
      id,
      message
    });
  }
}

module.exports = InvalidIdentifierError;
