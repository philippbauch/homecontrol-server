const { ObjectID } = require("mongodb");
const { db } = require("../db");
const {
  INTERNAL_ERROR,
  INVALID_OBJECT_ID,
  UNKNOWN_AUTH_ENTITY
} = require("../errors");

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
async function identification(req, res, next) {
  if (!req.auth) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }

  let { userId } = req.auth;

  if (!userId) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }

  if (!ObjectID.isValid(userId)) {
    return res.failure(INVALID_OBJECT_ID(CONTEXT));
  }

  const _id = ObjectID.createFromHexString(userId);

  let user;

  try {
    user = await db.users.findOne({ _id }, { projection: { hash: 0 } });

    if (!user) {
      return res.failure(UNKNOWN_AUTH_ENTITY);
    }
  } catch (error) {
    return res.failure(INTERNAL_ERROR(CONTEXT));
  }

  delete req.auth;

  req.user = user;

  next();
}

module.exports = { CONTEXT, identification };
