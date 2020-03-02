const CONTEXT = "validate_post_home";

function validatePostHome(req, res, next) {
  const { name } = req.body;

  if (!name) {
    res.error.missingRequiredField(CONTEXT, "name");
    return;
  }

  req.postHome = {
    name
  };

  next();
}

module.exports = { CONTEXT, validatePostHome };
