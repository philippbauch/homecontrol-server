function permitAdmin(req, res, next) {
  const { admin } = req.user;

  if (!admin) {
    return res.failure("Permission denied");
  }

  next();
}

module.exports = { permitAdmin };
