const { formatResponse } = require("../utils");

function success(req, res, next) {
  res.success = payload => {
    const response = formatResponse("data", payload);

    res.json(response);
  };

  next();
}

module.exports = { success };
