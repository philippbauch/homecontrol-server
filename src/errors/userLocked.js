function USER_LOCKED(context) {
  return {
    code: 400,
    id: "ERR_USER_LOCKED",
    message: "The user account is locked.",
    context
  };
}

module.exports = USER_LOCKED;
