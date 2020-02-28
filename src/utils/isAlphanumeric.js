function isAlphanumeric(word) {
  const regex = /^[a-z0-9]+$/i;

  return regex.test(word);
}

module.exports = { isAlphanumeric };
