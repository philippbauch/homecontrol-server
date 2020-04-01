const ApiError = require("./ApiError");

class MissingCookieError extends ApiError {
  constructor(value) {
    const code = 400;
    const id = "ERR_COOKIE_HEADER";
    const message = "Required cookie is missing";

    super({ code, id, message, value });
  }
}

module.exports = MissingCookieError;
