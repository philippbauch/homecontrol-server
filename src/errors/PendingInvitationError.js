const ApiError = require("./ApiError");

class PendingInvitationError extends ApiError {
  constructor(value) {
    const code = 400;
    const id = "ERR_PENDING_INVITATION";
    const message = "There's a pending invitation for this user already";

    super({ code, id, message, value });
  }
}

module.exports = PendingInvitationError;
