/**
 * Wraps the function passed as an argument into a try/catch and calls the
 * next function in case of an error.
 *
 * This makes sure all errors inside a wrapped middleware get caught
 * by registered Express error handlers.
 *
 * @param fn      - synchronous function
 * @param context - (optional) context of the function
 */
function wrapSync(fn, context) {
  return function(req, res, next) {
    try {
      fn(req, res, next)
    } catch (err) {
      if (context) {
        err.context = context;
      }
      next(err);
    }
  }
}

module.exports = { wrapSync };