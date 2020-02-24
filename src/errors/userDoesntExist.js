function USER_DOESNT_EXIST(context) {
  return {
    code: 400,
    id: "ERR_USER_DOESNT_EXIST",
    message: "The user doesn't exist.",
    context
  };
}

module.exports = USER_DOESNT_EXIST;
