const ApiError = require("./ApiError");

class MissingParamError extends ApiError {
  constructor(domain, value) {
    const code = 400;
    const id = "ERR_MISSING_PARAM";
    const message = "Required param is missing";

    super({
      code,
      domain,
      id,
      message,
      value
    });
  }
}

module.exports = MissingParamError;
