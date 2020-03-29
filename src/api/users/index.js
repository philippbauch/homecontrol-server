const { deleteUser } = require("./deleteUser");
const { getUser } = require("./getUser");
const { getUsers } = require("./getUsers");
const { postUser } = require("./postUser");
const { putUser } = require("./putUser");
const { putUserAdmin } = require("./putUserAdmin");
const { putUserLocked } = require("./putUserLocked");

module.exports = {
  deleteUser,
  getUser,
  getUsers,
  postUser,
  putUser,
  putUserAdmin,
  putUserLocked
};
