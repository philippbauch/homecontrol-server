function USER_ALREADY_CONFIRMED(context) {
  return {
    code: 400,
    id: "ERR_USER_ALREADY_CONFIRMED",
    message: "The user is already confirmed.",
    context
  };
}

module.exports = USER_ALREADY_CONFIRMED;
