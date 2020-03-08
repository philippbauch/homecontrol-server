const ApiError = require("./ApiError");

class PermissionDeniedError extends ApiError {
  constructor(value) {
    const code = 403;
    const id = "ERR_PERMISSION_DENIED";
    const message = "Permission denied";

    super({ code, id, message, value });
  }
}

module.exports = PermissionDeniedError;
