const { PermissionDeniedError } = require("../errors");

function errors(req, res, next) {
  res.error = {
    permissionDenied(context) {
      const error = new PermissionDeniedError(context);

      next(error);
    }
  };

  next();
}

module.exports = { errors };
