class RequestBuilder {
  constructor() {
    this.request = {
      body: {},
      headers: {},
      params: {},
      query: {}
    };
  }

  body(key, value) {
    this.request.body[key] = value;

    return this;
  }

  build() {
    return this.request;
  }

  header(key, value) {
    this.request.headers[key] = value;

    return this;
  }

  param(key, value) {
    this.request.params[key] = value;

    return this;
  }

  property(key, value) {
    this.request[key] = value;

    return this;
  }

  query(key, value) {
    this.request.query[key] = value;

    return this;
  }

  timestamp(value) {
    this.request.headers.timestamp = value;

    return this;
  }

  token(value) {
    this.request.headers.authentication = value;

    return this;
  }
}

module.exports = RequestBuilder;
