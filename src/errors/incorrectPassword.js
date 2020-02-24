function INCORRECT_PASSWORD(context) {
  return {
    code: 400,
    id: "ERR_INVALID_PASSWORD",
    message: "The password is incorrect.",
    context
  };
}

module.exports = INCORRECT_PASSWORD;
