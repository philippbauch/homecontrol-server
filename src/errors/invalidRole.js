function INVALID_ROLE(context) {
  return {
    code: 400,
    id: "ERR_INVALID_ROLE",
    message: "The role is invalid.",
    context
  };
}

module.exports = INVALID_ROLE;
