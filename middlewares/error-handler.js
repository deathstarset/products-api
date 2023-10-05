const { CustomError } = require("../errors/index");

const ErrorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  res.status(500).json({ msg: err.message });
};

module.exports = ErrorHandler;
