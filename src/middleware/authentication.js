const {
  MissingCookieError
} = require("../errors");
const { wrapAsync } = require("../utils");

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
  const { token: _id } = req.signedCookies;

  if (!_id) {
    throw new MissingCookieError("token");
  }

  req.auth = {
    userId: _id
  };

  next();
}, CONTEXT);

module.exports = { authentication, CONTEXT };
