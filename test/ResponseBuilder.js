class ResponseBuilder {
  constructor() {
    this.response = {
      json: jest.fn(),
      send: jest.fn(),
      status: jest.fn()
    };
  }

  build() {
    return this.response;
  }

  formatted() {
    this.response.failure = jest.fn();
    this.response.success = jest.fn();

    return this;
  }
}

module.exports = ResponseBuilder;
