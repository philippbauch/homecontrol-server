const CONTEXT = "validation";

/**
 * This middleware is responsible for:
 *  - Making sure the token payload has the required user information
 *  - Validiating the id and the role of the encoded user information
 *  - Checking the status of the encoded user account
 *
 * @param {*} req Express.js Request object
 * @param {*} res Express.js Response object
 * @param {*} next Express.js Next function
 */
async function validation(req, res, next) {
  const { locked } = req.user;

  if (locked) {
    return res.error.userLocked(CONTEXT);
  }

  next();
}

module.exports = { validation };
