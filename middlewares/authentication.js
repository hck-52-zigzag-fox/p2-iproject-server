const { User } = require("../models");
const { jwtVerify } = require("../helpers/index");

async function authentication(req, _res, next) {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw { name: "NoToken" };
    }

    const decoded = jwtVerify(token, process.env.JWT_SECRET);
    const { id } = decoded;
    const user = await User.findByPk(id);

    if (user) {
      req.user = { id: user.id, role: user.role, email: user.email };
      next();
    } else {
      throw { name: "Unauthorized" };
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
