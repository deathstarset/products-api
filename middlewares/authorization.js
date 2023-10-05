const { BadRequest } = require("../errors/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const authorization = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new BadRequest("Not authorized user please create an account"));
  }
  const token = authorization.split(" ")[1];
  try {
    const { userID } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userID;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authorization;
