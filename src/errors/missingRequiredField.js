function MISSING_REQUIRED_FIELD(field, context) {
  const fieldTrim = field.trim();
  const upperCaseField = fieldTrim.toUpperCase();

  return {
    code: 400,
    id: `ERR_REQUIRED_FIELD_${upperCaseField}`,
    message: `Required field '${fieldTrim}' is missing.`,
    context
  };
}

module.exports = MISSING_REQUIRED_FIELD;
