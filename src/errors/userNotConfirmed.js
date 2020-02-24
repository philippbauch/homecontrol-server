function USER_NOT_CONFIRMED(context) {
  return {
    code: 400,
    id: "ERR_USER_NOT_CONFIRMED",
    message: "The user is not confirmed.",
    context
  };
}

module.exports = USER_NOT_CONFIRMED;
