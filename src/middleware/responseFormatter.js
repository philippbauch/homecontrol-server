const { isObject } = require("../utils/isObject");

const responseFormatter = (req, res, next) => {
  res.success = payload => {
    const response = formatResponse("data", payload);

    res.json(response);
  };

  res.failure = error => {
    const response = formatResponse("error", error);

    if (error.code) {
      res.status(error.code);
    }

    res.json(response);
  };

  next();
};

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
  formatResponse,
  responseFormatter
};
