const CONTEXT = "validation";
const { UserLockedError } = require("../errors");
const { wrapAsync } = require("../utils");

const validation = wrapAsync(async function(req, res, next) {
  const { locked } = req.user;

  if (locked) {
    throw new UserLockedError();
  }

  next();
}, CONTEXT);

module.exports = { validation };
