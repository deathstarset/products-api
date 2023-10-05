const CustomError = require("./custom-error");

class AuthenticationFailed extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}
module.exports = AuthenticationFailed;
