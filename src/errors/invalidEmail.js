function INVALID_EMAIL(context) {
  return {
    code: 400,
    id: "ERR_INVALID_EMAIL",
    message: "The e-mail address is invalid.",
    context
  };
}

module.exports = INVALID_EMAIL;
