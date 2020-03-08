const jwt = require("jsonwebtoken");
const {
  InvalidPayloadTypeError,
  InvalidTokenError,
  MissingHeaderError
} = require("../errors");
const { isObject, wrapAsync } = require("../utils");

const CONTEXT = "authentication";

/**
 * This middleware is responsible for:
 *  - Making sure the `Authentication` header exists
 *  - Verifying and decoding the JWT token
 *  - Attaching the encoded user id to the request object
 *
 * @param {*} req Express.js Request object
 * @param {*} res Express.js Response object
 * @param {*} next Express.js Next function
 */
const authentication = wrapAsync(async function(req, res, next) {
  const { authentication } = req.headers;

  if (!authentication) {
    throw new MissingHeaderError("authentication");
  }

  let payload;

  try {
    payload = await jwt.verify(authentication, "secret");
  } catch (error) {
    throw new InvalidTokenError();
  }

  if (!isObject(payload)) {
    throw new InvalidPayloadTypeError();
  }

  if (!payload.user || !payload.user._id) {
    throw new InvalidTokenError();
  }

  req.auth = {
    userId: payload.user._id
  };

  next();
}, CONTEXT);

module.exports = { authentication, CONTEXT };
