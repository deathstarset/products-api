const CustomError = require("./custom-error");

class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundErr;
