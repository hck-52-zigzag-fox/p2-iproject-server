const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

//isLogin
module.exports = {
  isLogin: async (req, res, next) => {
    try {
      //token yang isinya merepresntasikan id
      const { access_token } = req.headers;

      if (!access_token) {
        throw { name: "Unauthorized" };
      }

      //untuk mengubah token ke bentuk object berisi id
      const payload = verifyToken(access_token);

      //mencari user dengan id dari token
      const user = await User.findByPk(payload.id);

      //jika user tidak ditemukan
      if (!user) {
        throw { name: "Unauthorized" };
      }

      req.user = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      next();
    } catch (err) {
      next(err);
    }
  },
};
