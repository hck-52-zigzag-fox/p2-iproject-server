const { Mentor: ModelMentor } = require("../models");

class Mentor {
  static async getMentors(req, res, next) {
    try {
      const options = {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      };
      const data = await ModelMentor.findAll(options);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async insertMentor(req, res, next) {
    try {
      const { profession, email, profile, name } = req.body;

      const data = await ModelMentor.create({ profession, email, profile, name });

      res.status(200).json({
        id: data.id,
        message: "mentor created successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async getMentor(req, res, next) {
    try {
      const id = +req.params.id;
      const options = {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      };

      const mentor = await ModelMentor.findByPk(id, options);
      if (!mentor) throw { name: "NoData" };

      res.status(200).json(mentor);
    } catch (err) {
      next(err);
    }
  }

  static async updateMentor(req, res, next) {
    try {
      const id = +req.params.id;
      const { profession, email, profile, name } = req.body;

      const mentor = await ModelMentor.findByPk(id);
      if (!mentor) throw { name: "NoData" };

      if (email) {
        const checkEmail = await ModelMentor.findOne({ where: { email } });
        if (checkEmail && email !== mentor.email) {
          throw { name: "ConflictEmailMentor" };
        }
      }

      await ModelMentor.update({ profession, email, profile, name }, { where: { id } });

      res.status(200).json({
        id: mentor.id,
        message: "mentor updated successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async destroyMentor(req, res, next) {
    try {
      const id = +req.params.id;
      const options = {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      };

      const mentor = await ModelMentor.findByPk(id, options);
      if (!mentor) throw { name: "NoData" };

      await ModelMentor.destroy({ where: { id } });

      res.status(200).json({
        id: mentor.id,
        message: `mentor ${mentor.name} deleted successfully`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Mentor;
