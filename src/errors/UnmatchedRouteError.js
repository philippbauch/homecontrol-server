const ApiError = require("./ApiError");

class UnmatchedRouteError extends ApiError {
  constructor(domain) {
    const code = 400;
    const id = "ERR_UNMATCHED_ROUTE";
    const message = "The called route doesn't exist";

    super({
      code,
      domain,
      id,
      message
    });
  }
}

module.exports = UnmatchedRouteError;
