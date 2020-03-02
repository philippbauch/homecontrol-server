const jwt = require("jsonwebtoken");
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
    return res.error.missingHeader(CONTEXT, "authentication");
  }

  let payload;

  try {
    payload = await jwt.verify(authentication, "secret");
  } catch (error) {
    return res.error.invalidToken(CONTEXT);
  }

  if (!isObject(payload)) {
    return res.error.invalidPayloadType(CONTEXT);
  }

  if (!payload.user || !payload.user._id) {
    return res.error.invalidToken(CONTEXT);
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
