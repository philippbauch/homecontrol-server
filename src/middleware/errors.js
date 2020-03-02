const {
  DeviceAlreadyExistsError,
  DeviceDoesntExistError,
  ExpiredTimestampError,
  FutureTimestampError,
  HomeAlreadyExistsError,
  HomeDoesntExistError,
  IncorrectPasswordError,
  InternalError,
  InvalidEmailError,
  InvalidIdentifierError,
  InvalidObjectIdError,
  InvalidPayloadTypeError,
  InvalidTimestampError,
  InvalidTokenError,
  MissingHeaderError,
  MissingParamError,
  MissingRequiredFieldError,
  PasswordTooShortError,
  PermissionDeniedError,
  RoomAlreadyExistsError,
  RoomDoesntExistError,
  UnknownUserError,
  UnmatchedRouteError,
  UserAlreadyExistsError,
  UserDoesntExistError,
  UserLockedError
} = require("../errors");

function errors(req, res, next) {
  res.error = {
    deviceAlreadyExists(context) {
      const error = new DeviceAlreadyExistsError(context);

      next(error);
    },
    deviceDoesntExist(context) {
      const error = new DeviceDoesntExistError(context);

      next(error);
    },
    expiredTimestamp(context) {
      const error = new ExpiredTimestampError(context);

      next(error);
    },
    futureTimestamp(context) {
      const error = new FutureTimestampError(context);

      next(error);
    },
    homeAlreadyExists(context) {
      const error = new HomeAlreadyExistsError(context);

      next(error);
    },
    homeDoesntExist(context) {
      const error = new HomeDoesntExistError(context);

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
    invalidIdentifier(context) {
      const error = new InvalidIdentifierError(context);

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
    roomAlreadyExists(context) {
      const error = new RoomAlreadyExistsError(context);

      next(error);
    },
    roomDoesntExist(context) {
      const error = new RoomDoesntExistError(context);

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
