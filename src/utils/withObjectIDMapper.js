const { ObjectID } = require("mongodb");
const { INVALID_OBJECT_ID } = require("../errors");

const CONTEXT = "map_params_to_object_id";

function shouldMapParam(param) {
  return param.endsWith("Id");
}

function mapObjectIDs(req, res, next) {
  const { params } = req;

  for (let param of Object.keys(params)) {
    const value = params[param];

    if (!shouldMapParam(param)) {
      continue;
    }

    if (!ObjectID.isValid(value)) {
      return res.failure(INVALID_OBJECT_ID(CONTEXT));
    }

    const _id = ObjectID.createFromHexString(value);

    params[param] = _id;
  }

  next();
}

function withObjectIDMapper(router) {
  const methods = ["delete", "get", "patch", "post", "put"];

  methods.forEach(method => {
    const _method = router[method];

    if (!_method) return;

    router[method] = (path, callback, ...callbacks) => {
      _method.call(router, path, mapObjectIDs, callback, ...callbacks);
    };
  });
}

module.exports = { withObjectIDMapper };
