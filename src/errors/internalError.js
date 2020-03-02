const ApiError = require("./ApiError");

class InternalError extends ApiError {
  constructor(domain) {
    const code = 500;
    const id = "ERR_INTERNAL_ERROR";
    const message = "Internal server error";

    super({
      code,
      domain,
      id,
      message
    });
  }
}

module.exports = InternalError;
