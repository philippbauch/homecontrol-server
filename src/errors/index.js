const ExpiredTimestampError = require("./ExpiredTimestampError");
const FutureTimestampError = require("./FutureTimestampError");
const IncorrectPasswordError = require("./IncorrectPasswordError");
const InternalError = require("./InternalError");
const InvalidEmailError = require("./InvalidEmailError");
const InvalidObjectIdError = require("./InvalidObjectIdError");
const InvalidPayloadTypeError = require("./InvalidPayloadTypeError");
const InvalidTimestampError = require("./InvalidTimestampError");
const InvalidTokenError = require("./InvalidTokenError");
const MissingHeaderError = require("./MissingHeaderError");
const MissingParamError = require("./MissingParamError");
const MissingRequiredFieldError = require("./MissingRequiredFieldError");
const PasswordTooShortError = require("./PasswordTooShortError");
const PermissionDeniedError = require("./PermissionDeniedError");
const UnknownUserError = require("./UnknownUserError");
const UnmatchedRouteError = require("./UnmatchedRouteError");
const UserAlreadyExistsError = require("./UserAlreadyExistsError");
const UserDoesntExistError = require("./UserDoesntExistError");
const UserLockedError = require("./UserLockedError");

module.exports = {
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
};
