const { ObjectID } = require("mongodb");
const { db } = require("../db");
const { InternalError, InvalidObjectIdError, UnknownUserError } = require("../errors");
const { wrapAsync } = require("../utils");

const CONTEXT = "identification";

/**
 * This middleware is responsible for:
 *  - Validating the user id received from `authentication`
 *  - Trying to find a user with the given user id
 *  - Attaching the user object (if found) to the request object
 *
 * @param {*} req Express.js Request object
 * @param {*} res Express.js Response object
 * @param {*} next Express.js Next function
 */
const identification = wrapAsync(async function(req, res, next) {
  if (!req.auth || !req.auth.userId) {
    throw new InternalError();
  }

  let { userId } = req.auth;

  if (!ObjectID.isValid(userId)) {
    throw new InvalidObjectIdError();
  }

  const _id = ObjectID.createFromHexString(userId);

  let user = await db.users.findOne({ _id }, { projection: { hash: 0 } });

  if (!user) {
    throw new UnknownUserError();
  }

  delete req.auth;

  req.user = user;

  next();
}, CONTEXT);

module.exports = { CONTEXT, identification };
