const { getHome, validateGetHome } = require("./getHome");
const { getHomes, validateGetHomes } = require("./getHomes");
const { postHome, validatePostHome } = require("./postHome");

module.exports = {
  getHome,
  getHomes,
  postHome,
  validateGetHome,
  validateGetHomes,
  validatePostHome
};
