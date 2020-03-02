const { ObjectID } = require("mongodb");
const { db } = require("../db");

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
    return res.error.internalError(CONTEXT);
  }

  let { userId } = req.auth;

  if (!userId) {
    return res.error.internalError(CONTEXT);
  }

  if (!ObjectID.isValid(userId)) {
    return res.error.invalidObjectId(CONTEXT);
  }

  const _id = ObjectID.createFromHexString(userId);

  let user;

  try {
    user = await db.users.findOne({ _id }, { projection: { hash: 0 } });

    if (!user) {
      return res.error.unknownUser(CONTEXT);
    }
  } catch (error) {
    return res.error.internalError(CONTEXT);
  }

  delete req.auth;

  req.user = user;

  next();
}

module.exports = { CONTEXT, identification };
