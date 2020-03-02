const { isObject } = require("./isObject");

const formatResponse = (type, payload) => {
  if (Array.isArray(payload)) {
    return {
      [type]: [...payload]
    };
  } else if (isObject(payload)) {
    return {
      [type]: { ...payload }
    };
  } else {
    return {
      [type]: payload
    };
  }
};

module.exports = {
  formatResponse
};
