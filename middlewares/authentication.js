const { verifyToken } = require("../helpers");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Unauthorized" };
    }
    const decoded = verifyToken(access_token);
    if (!decoded) {
      throw { name: "Unauthorized" };
    }
    const findUser = await User.findOne({ where: { id: decoded.id } });
    if (!findUser) {
      throw { name: "Unauthorized" };
    }
    req.user = { id: decoded.id, role: findUser.role, email: findUser.email };
    next();
  } catch (err) {
    next(err);
  }
}
module.exports = { authentication };
