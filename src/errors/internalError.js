function INTERNAL_ERROR(context) {
  return {
    code: 500,
    id: "ERR_INTERNAL_ERROR",
    message: "Internal server error.",
    context
  };
}

module.exports = INTERNAL_ERROR;
