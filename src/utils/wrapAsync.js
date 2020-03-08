/**
 * Chains a catch handler calling the next function to the promise returned
 * from the asynchronous function passed as an argument.
 *
 * This makes sure all errors inside a wrapped async middleware get caught
 * by registered Express error handlers.
 *
 * @param fn      - async function
 * @param context - (optional) context of the async function
 */
function wrapAsync(fn, context) {
  return function(req, res, next) {
    fn(req, res, next).catch(err => {
      if (context) {
        err.context = context;
      }
      next(err);
    });
  }
}

module.exports = { wrapAsync };