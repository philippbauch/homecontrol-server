function INVALID_OBJECT_ID(context) {
  return {
    code: 400,
    id: "ERR_INVALID_OBJECT_ID",
    message: "The ObjectID is invalid.",
    context
  };
}

module.exports = INVALID_OBJECT_ID;
