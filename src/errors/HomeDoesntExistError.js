const ApiError = require("./ApiError");

class HomeDoesntExistError extends ApiError {
  constructor(domain) {
    const code = 400;
    const id = "ERR_HOME_DOESNT_EXIST";
    const message = "A home with the given identifier doesn't exist";

    super({
      code,
      domain,
      id,
      message
    });
  }
}

module.exports = HomeDoesntExistError;
