const ApiError = require("./ApiError");

class InvitationDoesntExistError extends ApiError {
  constructor(value) {
    const code = 400;
    const id = "ERR_INVITATION_DOESNT_EXIST";
    const message = "An invitation with the given ObjectId doesn't exist";

    super({ code, id, message, value });
  }
}

module.exports = InvitationDoesntExistError;
