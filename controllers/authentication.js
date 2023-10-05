const asyncMiddleware = require("../middlewares/async");
const {
  BadRequest,
  NotFoundErr,
  AuthenticationFailed,
} = require("../errors/index");
const User = require("../models/User");
const register = asyncMiddleware(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (name === "" || email === "" || password === "") {
    next(new BadRequest("Please fill all the fields"));
  }
  const user = await User.create({ name, email, password });
  const token = await user.genJWT(user._id);
  res.status(200).json({ token });
});

const login = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    return next(new BadRequest("Please fill all the fields"));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return next(new NotFoundErr(`there is no user with the email ${email}`));
  }
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(new AuthenticationFailed("password incorrect try another one"));
  }

  const token = await user.genJWT(user._id);

  res.status(200).json({ token });
});

module.exports = { login, register };
