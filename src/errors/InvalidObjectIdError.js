const ApiError = require("./ApiError");

class InvalidObjectIdError extends ApiError {
  constructor(value) {
    const code = 400;
    const id = "ERR_INVALID_OBJECT_ID";
    const message = "The ObjectId is invalid";

    super({ code, id, message, value });
  }
}

module.exports = InvalidObjectIdError;
