const ApiError = require("./ApiError");

class HomeAlreadyExistsError extends ApiError {
  constructor(domain, value) {
    const code = 400;
    const id = "ERR_HOME_ALREADY_EXISTS";
    const message = "A home with the given identifier already exists";

    super({
      code,
      domain,
      id,
      message,
      value
    });
  }
}

module.exports = HomeAlreadyExistsError;
