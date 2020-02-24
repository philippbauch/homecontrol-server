const { getUser, validateGetUser } = require("./getUser");
const { getUsers, validateGetUsers } = require("./getUsers");
const { postUser, validatePostUser } = require("./postUser");

module.exports = {
  getUser,
  getUsers,
  postUser,
  validateGetUser,
  validateGetUsers,
  validatePostUser
};
