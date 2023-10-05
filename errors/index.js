const CustomError = require("./custom-error");
const BadRequest = require("./bad-request");
const NotFoundErr = require("./not-found-err");
const AuthenticationFailed = require("./authentication-failed");

module.exports = { CustomError, BadRequest, NotFoundErr, AuthenticationFailed };
