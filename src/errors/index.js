const DeviceAlreadyExistsError = require("./DeviceAlreadyExistsError");
const DeviceDoesntExistError = require("./DeviceDoesntExistError");
const ExpiredTimestampError = require("./ExpiredTimestampError");
const FutureTimestampError = require("./FutureTimestampError");
const HomeAlreadyExistsError = require("./HomeAlreadyExistsError");
const HomeDoesntExistError = require("./HomeDoesntExistError");
const IncorrectPasswordError = require("./IncorrectPasswordError");
const InternalError = require("./InternalError");
const InvalidEmailError = require("./InvalidEmailError");
const InvalidIdentifierError = require("./InvalidIdentifierError");
const InvalidObjectIdError = require("./InvalidObjectIdError");
const InvalidPayloadTypeError = require("./InvalidPayloadTypeError");
const InvalidTimestampError = require("./InvalidTimestampError");
const InvalidTokenError = require("./InvalidTokenError");
const MissingHeaderError = require("./MissingHeaderError");
const MissingParamError = require("./MissingParamError");
const MissingRequiredFieldError = require("./MissingRequiredFieldError");
const PasswordTooShortError = require("./PasswordTooShortError");
const PermissionDeniedError = require("./PermissionDeniedError");
const RoomAlreadyExistsError = require("./RoomAlreadyExistsError");
const RoomDoesntExistError = require("./RoomDoesntExistError");
const UnknownUserError = require("./UnknownUserError");
const UnmatchedRouteError = require("./UnmatchedRouteError");
const UserAlreadyExistsError = require("./UserAlreadyExistsError");
const UserDoesntExistError = require("./UserDoesntExistError");
const UserLockedError = require("./UserLockedError");

module.exports = {
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
};
