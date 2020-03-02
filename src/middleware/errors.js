const {
  ExpiredTimestampError,
  FutureTimestampError,
  IncorrectPasswordError,
  InternalError,
  InvalidEmailError,
  InvalidObjectIdError,
  InvalidPayloadTypeError,
  InvalidTimestampError,
  InvalidTokenError,
  MissingHeaderError,
  MissingParamError,
  MissingRequiredFieldError,
  PasswordTooShortError,
  PermissionDeniedError,
  UnknownUserError,
  UnmatchedRouteError,
  UserAlreadyExistsError,
  UserDoesntExistError,
  UserLockedError
} = require("../errors");

function errors(req, res, next) {
  res.error = {
    expiredTimestamp(context) {
      const error = new ExpiredTimestampError(context);

      next(error);
    },
    futureTimestamp(context) {
      const error = new FutureTimestampError(context);

      next(error);
    },
    incorrectPassword(context) {
      const error = new IncorrectPasswordError(context);

      next(error);
    },
    internalError(context) {
      const error = new InternalError(context);

      next(error);
    },
    invalidEmail(context) {
      const error = new InvalidEmailError(context);

      next(error);
    },
    invalidObjectId(context) {
      const error = new InvalidObjectIdError(context);

      next(error);
    },
    invalidPayloadType(context) {
      const error = new InvalidPayloadTypeError(context);

      next(error);
    },
    invalidTimestamp(context) {
      const error = new InvalidTimestampError(context);

      next(error);
    },
    invalidToken(context) {
      const error = new InvalidTokenError(context);

      next(error);
    },
    missingHeader(context, value) {
      const error = new MissingHeaderError(context, value);

      next(error);
    },
    missingParam(context, value) {
      const error = new MissingParamError(context, value);

      next(error);
    },
    missingRequiredField(context, value) {
      const error = new MissingRequiredFieldError(context, value);

      next(error);
    },
    passwordTooShort(context) {
      const error = new PasswordTooShortError(context);

      next(error);
    },
    permissionDenied(context) {
      const error = new PermissionDeniedError(context);

      next(error);
    },
    unknownUser(context) {
      const error = new UnknownUserError(context);

      next(error);
    },
    unmatchedRoute(context) {
      const error = new UnmatchedRouteError(context);

      next(error);
    },
    userAlreadyExists(context, value) {
      const error = new UserAlreadyExistsError(context, value);

      next(error);
    },
    userDoesntExist(context, value) {
      const error = new UserDoesntExistError(context, value);

      next(error);
    },
    userLocked(context) {
      const error = new UserLockedError(context);

      next(error);
    }
  };

  next();
}

module.exports = { errors };
