function MISSING_HEADER(field, context) {
  const fieldTrim = field.trim();
  const upperCaseField = fieldTrim.toUpperCase();

  return {
    code: 400,
    id: `ERR_MISSING_HEADER_${upperCaseField}`,
    message: `Required field '${fieldTrim}' is missing.`,
    context
  };
}

module.exports = MISSING_HEADER;
