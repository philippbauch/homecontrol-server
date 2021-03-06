const ApiError = require("./ApiError");

class RequiredFieldError extends ApiError {
  constructor(value) {
    const code = 400;
    const id = "ERR_REQUIRED_FIELD";
    const message = "Required field is missing";

    super({ code, id, message, value });
  }
}

module.exports = RequiredFieldError;
