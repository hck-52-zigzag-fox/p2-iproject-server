const { verifyToken } = require("../helpers");
const {User} = require('../models')
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

//   async authorization(req, res, next) {
//     try {
//       const id = req.params.id;
//       const food = await Food.findByPk(id);
//       if (food.UserId !== req.user.id) {
//         throw { name: "FORBIDDEN" };
//       }
//       next();
//     } catch (err) {
//       next(err);
//     }
//   },
};
