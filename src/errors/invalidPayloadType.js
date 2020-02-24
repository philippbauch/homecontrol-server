function INVALID_PAYLOAD_TYPE(context) {
  return {
    code: 400,
    id: "ERR_INVALID_PAYLOAD_TYPE",
    message: "The token payload must be of type `object`.",
    context
  };
}

module.exports = INVALID_PAYLOAD_TYPE;
