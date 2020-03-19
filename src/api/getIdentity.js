const { wrapAsync } = require("../utils");

const CONTEXT = "get_invitations";

const getIdentity = wrapAsync(async function(req, res) {
  return res.success(req.user);
}, CONTEXT);

module.exports = { CONTEXT, getIdentity };
