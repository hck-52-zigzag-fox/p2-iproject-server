const { User, ProfileGirlfriend } = require("../models");
const { verifyToken } = require("../helpers/jwt");
async function authentication(req, res, next) {
  try {
    let profile;
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
      if (user.role === "girlfriend") {
        profile = await ProfileGirlfriend.findOne({
          where: {
            UserId: user.id,
          },
        });
      }
      req.user = {
        id: user.id,
        role: user.role,
        email: user.email,
        profileId: user.role == "girlfriend" ? profile.id : 0,
      };
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
