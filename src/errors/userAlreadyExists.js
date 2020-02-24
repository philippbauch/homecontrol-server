const USER_ALREADY_EXISTS = {
  code: 400,
  id: "ERR_USER_ALREADY_EXISTS",
  message: "A user with this e-mail already exists.",
  context: "signup"
};

module.exports = USER_ALREADY_EXISTS;
