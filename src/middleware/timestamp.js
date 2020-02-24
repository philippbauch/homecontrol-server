const moment = require("moment");
const {
  EXPIRED_TIMESTAMP,
  FUTURE_TIMESTAMP,
  INVALID_TIMESTAMP,
  MISSING_HEADER
} = require("../errors");

const CONTEXT = "timestamp";

function timestamp(req, res, next) {
  let { timestamp } = req.headers;

  if (!timestamp) {
    return res.failure(MISSING_HEADER("timestamp", CONTEXT));
  }

  if (!Number.isInteger(timestamp)) {
    timestamp = Number.parseInt(timestamp);

    if (Number.isNaN(timestamp)) {
      return res.failure(INVALID_TIMESTAMP);
    }
  }

  const timeOfRequest = moment(timestamp);

  if (!timeOfRequest.isValid()) {
    return res.failure(INVALID_TIMESTAMP);
  }

  const now = moment();
  const timeDiffInMinutes = now.diff(timeOfRequest, "minutes");

  if (timeDiffInMinutes < 0) {
    return res.failure(FUTURE_TIMESTAMP);
  }

  if (timeDiffInMinutes >= 2) {
    return res.failure(EXPIRED_TIMESTAMP);
  }

  req.time = timeOfRequest;

  next();
}

module.exports = {
  CONTEXT,
  timestamp
};
