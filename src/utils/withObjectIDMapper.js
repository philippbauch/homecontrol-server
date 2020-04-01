const { ObjectID } = require("mongodb");
const { isObject } = require("../utils/isObject");

const CONTEXT = "map_params_to_object_id";

function shouldMapKey(key) {
  return key.endsWith("Id");
}

function mapObjectIDs(object) {
  for (let key of Object.keys(object)) {
    const value = object[key];

    if (isObject(value)) {
      mapObjectIDs(value);
      continue;
    }

    if (!shouldMapKey(key)) {
      continue;
    }

    if (!ObjectID.isValid(value)) {
      throw new Error();
    }

    object[key] = ObjectID.createFromHexString(value);
  }
}

function mapper(req, res, next) {
  const { body, params, query } = req;

  try {
    mapObjectIDs(body);
    mapObjectIDs(params);
    mapObjectIDs(query);
  } catch (error) {
    return res.error.invalidObjectId(CONTEXT);
  }

  next();
}

function withObjectIDMapper(router) {
  const methods = ["delete", "get", "patch", "post", "put"];

  methods.forEach(method => {
    const _method = router[method];

    if (!_method) return;

    router[method] = (path, callback, ...callbacks) => {
      _method.call(router, path, mapper, callback, ...callbacks);
    };
  });
}

module.exports = { withObjectIDMapper };
