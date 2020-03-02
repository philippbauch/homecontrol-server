const ApiError = require("./ApiError");

class InvalidObjectIdError extends ApiError {
  constructor(domain) {
    const code = 400;
    const id = "ERR_INVALID_OBJECT_ID";
    const message = "The ObjectId is invalid";

    super({
      code,
      domain,
      id,
      message
    });
  }
}

module.exports = InvalidObjectIdError;
