const jwt = require("jsonwebtoken");
const {
  InvalidPayloadTypeError,
  InvalidTokenError,
  MissingCookieError
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
  const { token } = req.cookies;

  if (!token) {
    throw new MissingCookieError("token");
  }

  let payload;

  try {
    payload = await jwt.verify(token, "secret");
  } catch (error) {
    throw new InvalidTokenError();
  }

  if (!isObject(payload)) {
    throw new InvalidPayloadTypeError();
  }

  if (!payload._id) {
    throw new InvalidTokenError();
  }

  req.auth = {
    userId: payload._id
  };

  next();
}, CONTEXT);

module.exports = { authentication, CONTEXT };
