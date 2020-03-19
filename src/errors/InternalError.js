const ApiError = require("./ApiError");

class InternalError extends ApiError {
  constructor(value) {
    const code = 500;
    const id = "ERR_INTERNAL_ERROR";
    const message = "Internal server error";

    super({ code, id, message, value });
  }
}

module.exports = InternalError;
