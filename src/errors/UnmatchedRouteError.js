const ApiError = require("./ApiError");

class UnmatchedRouteError extends ApiError {
  constructor(value) {
    const code = 400;
    const id = "ERR_UNMATCHED_ROUTE";
    const message = "The called route doesn't exist";

    super({ code, id, message, value });
  }
}

module.exports = UnmatchedRouteError;
