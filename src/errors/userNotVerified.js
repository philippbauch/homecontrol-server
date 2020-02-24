function USER_NOT_VERIFIED(context) {
  return {
    code: 400,
    id: "ERR_USER_NOT_VERIFIED",
    message: "The user is not verified.",
    context
  };
}

module.exports = USER_NOT_VERIFIED;
