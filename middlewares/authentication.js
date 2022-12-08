const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

const authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers;

    if (!access_token) {
      throw { name: "Unauthorized" };
    }

    let payload = verifyToken(access_token);

    let user = await User.findByPk(payload.id);

    if (!user) {
      throw { name: "Unauthorized" };
    }

    req.user = {
      id: user.id,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
