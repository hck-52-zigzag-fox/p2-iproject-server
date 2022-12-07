const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");
async function authentication(req, res, next) {
  try {
    const decoded = verifyToken(req.headers.access_token);
    let user = await User.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      throw {
        name: "Unauthorized",
        msg: "Please Relogin",
      };
    } else {
      req.user = { id: user.id, role: user.role, email: user.email };
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
