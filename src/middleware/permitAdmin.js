const CONTEXT = "check_permissions";

function permitAdmin(req, res, next) {
  const { admin } = req.user;

  if (!admin) {
    return res.error.permissionDenied(CONTEXT);
  }

  next();
}

module.exports = { permitAdmin };
