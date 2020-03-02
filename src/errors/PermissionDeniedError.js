const ApiError = require("./ApiError");

class PermissionDeniedError extends ApiError {
  constructor(context) {
    const code = 403;
    const id = "ERR_PERMISSION_DENIED";
    const message = "Permission denied";

    super({
      code,
      context,
      id,
      message
    });
  }
}

module.exports = PermissionDeniedError;
