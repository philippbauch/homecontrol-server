const ApiError = require("./ApiError");

class MissingParamError extends ApiError {
  constructor(value) {
    const code = 400;
    const id = "ERR_MISSING_PARAM";
    const message = "Required param is missing";

    super({ code, id, message, value });
  }
}

module.exports = MissingParamError;
