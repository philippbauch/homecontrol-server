const ApiError = require("./ApiError");

class InvalidPayloadTypeError extends ApiError {
  constructor(domain) {
    const code = 400;
    const id = "ERR_INVALID_PAYLOAD_TYPE";
    const message = "The token payload must be of type `object`";

    super({
      code,
      domain,
      id,
      message
    });
  }
}

module.exports = InvalidPayloadTypeError;
