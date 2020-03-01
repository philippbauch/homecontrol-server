const { MISSING_REQUIRED_FIELD } = require("../../../errors");

const CONTEXT = "validate_post_room";

function validatePostRoom(req, res, next) {
  const { name } = req.body;

  if (!name) {
    res.failure(MISSING_REQUIRED_FIELD("name", CONTEXT));
    return;
  }

  req.postRoom = {
    name
  };

  next();
}

module.exports = { CONTEXT, validatePostRoom };
