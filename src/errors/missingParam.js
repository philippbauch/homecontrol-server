function MISSING_PARAM(field, context) {
  const fieldTrim = field.trim();
  const upperCaseField = fieldTrim.toUpperCase();

  return {
    code: 400,
    id: `ERR_MISSING_PARAM_${upperCaseField}`,
    message: `Required parameter '${fieldTrim}' is missing.`,
    context
  };
}

module.exports = MISSING_PARAM;
