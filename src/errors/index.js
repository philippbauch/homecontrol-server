const EXPIRED_TIMESTAMP = require("./expiredTimestamp");
const FUTURE_TIMESTAMP = require("./futureTimestamp");
const INCORRECT_PASSWORD = require("./incorrectPassword");
const INTERNAL_ERROR = require("./internalError");
const INVALID_EMAIL = require("./invalidEmail");
const INVALID_OBJECT_ID = require("./invalidObjectId");
const INVALID_PAYLOAD_TYPE = require("./invalidPayloadType");
const INVALID_ROLE = require("./invalidRole");
const INVALID_TIMESTAMP = require("./invalidTimestamp");
const INVALID_TOKEN = require("./invalidToken");
const MISSING_HEADER = require("./missingHeader");
const MISSING_PARAM = require("./missingParam");
const MISSING_REQUIRED_FIELD = require("./missingRequiredField");
const PASSWORD_TOO_SHORT = require("./passwordTooShort");
const UNKNOWN_AUTH_ENTITY = require("./unknownAuthEntity");
const UNMATCHED_ROUTE = require("./unmatchedRoute");
const USER_ALREADY_CONFIRMED = require("./userAlreadyConfirmed");
const USER_ALREADY_EXISTS = require("./userAlreadyExists");
const USER_DOESNT_EXIST = require("./userDoesntExist");
const USER_LOCKED = require("./userLocked");
const USER_NOT_CONFIRMED = require("./userNotConfirmed");
const USER_NOT_VERIFIED = require("./userNotVerified");

const PermissionDeniedError = require("./PermissionDeniedError");

module.exports = {
  EXPIRED_TIMESTAMP,
  FUTURE_TIMESTAMP,
  INCORRECT_PASSWORD,
  INTERNAL_ERROR,
  INVALID_EMAIL,
  INVALID_OBJECT_ID,
  INVALID_PAYLOAD_TYPE,
  INVALID_ROLE,
  INVALID_TIMESTAMP,
  INVALID_TOKEN,
  MISSING_HEADER,
  MISSING_PARAM,
  MISSING_REQUIRED_FIELD,
  PASSWORD_TOO_SHORT,
  UNKNOWN_AUTH_ENTITY,
  UNMATCHED_ROUTE,
  USER_ALREADY_CONFIRMED,
  USER_ALREADY_EXISTS,
  USER_DOESNT_EXIST,
  USER_LOCKED,
  USER_NOT_CONFIRMED,
  USER_NOT_VERIFIED,

  PermissionDeniedError
};
