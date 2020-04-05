const { wrapAsync } = require("../utils");

const CONTEXT = "get_invitations";

const identity = wrapAsync(async function(req, res) {
  return res.success(req.user);
}, CONTEXT);

module.exports = { CONTEXT, identity };
