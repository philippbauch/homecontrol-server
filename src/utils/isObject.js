function isObject(object, allowNull = false) {
  const isTypeObject = typeof object === "object";
  const isNull = object === null;

  return isTypeObject && (allowNull || !isNull);
}

module.exports = { isObject };
