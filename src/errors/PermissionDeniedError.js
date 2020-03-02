const ApiError = require("./ApiError");

class PermissionDeniedError extends ApiError {
  constructor(domain) {
    const code = 403;
    const id = "ERR_PERMISSION_DENIED";
    const message = "Permission denied";

    super({
      code,
      domain,
      id,
      message
    });
  }
}

module.exports = PermissionDeniedError;
