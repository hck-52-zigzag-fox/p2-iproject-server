const { verifyToken } = require("../helpers/token");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "UNAUTHORIZED" };
    }

    const payload = verifyToken(access_token);

    const findUser = await User.findByPk(payload.id);
    if (!findUser) {
      throw { name: "UNAUTHORIZED" };
    }

    req.user = {
      id: findUser.id,
      email: findUser.email,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authentication };
