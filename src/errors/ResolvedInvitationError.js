const ApiError = require("./ApiError");

class ResolvedInvitationError extends ApiError {
  constructor(value) {
    const code = 400;
    const id = "ERR_RESOLVED_INVITATION";
    const message = "This invitation has already been resolved";

    super({ code, id, message, value });
  }
}

module.exports = ResolvedInvitationError;
