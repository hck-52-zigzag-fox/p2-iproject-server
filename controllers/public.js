const { Course, Chapter, Mentor } = require("../models");

class Public {
  static async getCourses(req, res, next) {
    try {
      const options = {
        attributes: {
          exclude: ["createdAt", "updatedAt", "status"],
        },
        include: {
          model: Mentor,
          attributes: {
            exclude: ["createdAt", "updatedAt", "profile", "email", "profession"],
          },
        },
        order: [["id", "ASC"]],
      };
      const data = await Course.findAll(options);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async getCourse(req, res, next) {
    try {
      const id = +req.params.id;

      const options = {
        attributes: {
          exclude: ["createdAt", "updatedAt", "status"],
        },
        include: [
          {
            model: Mentor,
            attributes: {
              exclude: ["createdAt", "updatedAt", "profile", "email"],
            },
          },
          {
            model: Chapter,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        order: [
          ["id", "ASC"],
          [{ model: Chapter }, "id", "ASC"],
        ],
      };
      const data = await Course.findByPk(id, options);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Public;
