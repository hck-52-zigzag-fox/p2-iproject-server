const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "Unauthorized" };
    }

    const payload = verifyToken(access_token);

    const foundUser = await User.findByPk(payload.id);

    if (!foundUser) {
      throw { name: "Unauthorized" };
    }
    req.user = {
      id: foundUser.id,
      role: foundUser.role,
      email: foundUser.email,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
