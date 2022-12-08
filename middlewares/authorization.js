const { User } = require("../models/index");

module.exports = {
  isAdmin: (req, res, next) => {
    try {
      if (req.user.role !== "Admin") {
        throw { name: "Forbidden" };
      }
      next();
    } catch (err) {
      next(err);
    }
  },
};
