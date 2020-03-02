const moment = require("moment");

const CONTEXT = "timestamp";

function timestamp(req, res, next) {
  let { timestamp } = req.headers;

  if (!timestamp) {
    return res.error.missingHeader(CONTEXT, "timestamp");
  }

  if (!Number.isInteger(timestamp)) {
    timestamp = Number.parseInt(timestamp);

    if (Number.isNaN(timestamp)) {
      return res.error.invalidTimestamp(CONTEXT);
    }
  }

  const timeOfRequest = moment(timestamp);

  if (!timeOfRequest.isValid()) {
    return res.error.invalidTimestamp(CONTEXT);
  }

  const now = moment();
  const timeDiffInMinutes = now.diff(timeOfRequest, "minutes");

  if (timeDiffInMinutes < 0) {
    return res.error.futureTimestamp(CONTEXT);
  }

  if (timeDiffInMinutes >= 2) {
    return res.error.expiredTimestamp(CONTEXT);
  }

  req.time = timeOfRequest;

  next();
}

module.exports = {
  CONTEXT,
  timestamp
};
