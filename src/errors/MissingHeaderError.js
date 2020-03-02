const ApiError = require("./ApiError");

class MissingHeaderError extends ApiError {
  constructor(domain, value) {
    const code = 400;
    const id = "ERR_MISSING_HEADER";
    const message = "Required header is missing";

    super({
      code,
      domain,
      id,
      message,
      value
    });
  }
}

module.exports = MissingHeaderError;
