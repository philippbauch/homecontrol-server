const jwt = require("jsonwebtoken");
const {
  INVALID_PAYLOAD_TYPE,
  INVALID_TOKEN,
  MISSING_HEADER
} = require("../errors");
const { isObject } = require("../utils");

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
async function authentication(req, res, next) {
  const { authentication } = req.headers;

  if (!authentication) {
    return res.failure(MISSING_HEADER("authentication", CONTEXT));
  }

  let payload;

  try {
    payload = await jwt.verify(authentication, "secret");
  } catch (error) {
    return res.failure(INVALID_TOKEN);
  }

  if (!isObject(payload)) {
    return res.failure(INVALID_PAYLOAD_TYPE(CONTEXT));
  }

  if (!payload.user || !payload.user._id) {
    return res.failure(INVALID_TOKEN);
  }

  req.auth = {
    userId: payload.user._id
  };

  next();
}

module.exports = {
  authentication,
  CONTEXT
};
