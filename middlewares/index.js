const { verifyToken } = require("../helpers");
const { User, Order, Product } = require("../models");
module.exports = {
  async authentication(req, res, next) {
    try {
      const { access_token } = req.headers;
      if (!access_token) {
        throw { name: `UNAUTHORIZED` };
      }
      const payload = verifyToken(access_token);
      const foundUser = await User.findByPk(payload.id);
      if (!foundUser) {
        throw { name: `UNAUTHORIZED` };
      }
      req.user = {
        id: foundUser.id,
      };
      next();
    } catch (err) {
      next(err);
    }
  },

  async authorization(req, res, next) {
    try {
      console.log("==========");
      const id = req.params.id;
      const product = await Product.findByPk(id);
      if (product.UserId !== req.user.id) {
        throw { name: "FORBIDDEN" };
      }
      next();
    } catch (err) {
      console.log(err, "2940928340982");
      next(err);
    }
  },
};
