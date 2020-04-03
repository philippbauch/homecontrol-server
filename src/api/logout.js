const { SERVER_DOMAIN } = require("../environment");
const { wrapSync } = require("../utils");

const CONTEXT = "logout";

const logout = wrapSync(function(req, res) {
  return res
    .clearCookie("token", {
      domain: SERVER_DOMAIN,
      httpOnly: true,
      signed: true
    })
    .success();
}, CONTEXT);

module.exports = { CONTEXT, logout };
