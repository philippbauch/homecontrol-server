const { PermissionDeniedError } = require("../errors");
const { wrapSync } = require("../utils");

const CONTEXT = "check_permissions";

const permitAdmin = wrapSync(function(req, res, next) {
  const { admin } = req.user;

  if (!admin) {
    throw new PermissionDeniedError();
  }

  next();
}, CONTEXT);

module.exports = { permitAdmin };
