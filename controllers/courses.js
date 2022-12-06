const { Mentor: ModelMentor, Course: ModelCourse } = require("../models");
const cloudinary = require("../helpers/cloudinary");
const fs = require("fs");

class Course {
  static async getCourses(req, res, next) {
    try {
      const options = {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: ModelMentor,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        order: [["id", "ASC"]],
      };
      const data = await ModelCourse.findAll(options);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async insertCourse(req, res, next) {
    try {
      let { name, thumbnail, price, description, MentorId } = req.body;

      if (!MentorId) throw { name: "NotMentorId" };
      const mentor = await ModelMentor.findByPk(MentorId);
      if (!mentor) throw { name: "NotFoundMentor" };

      if (req.file) {
        if (req.file.size > 4999999) throw { name: "ImgToMuchLarge" };

        const up = await cloudinary.uploader.upload(req.file.path, {
          eager_async: true,
        });

        if (up.created_at) {
          thumbnail = up.secure_url;
          fs.unlinkSync(req.file.path);
        }
      }

      const data = await ModelCourse.create({ name, thumbnail, price, description });

      res.status(200).json({
        id: data.id,
        message: "mentor created successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async getCourse(req, res, next) {
    try {
      const id = +req.params.id;
      const options = {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: ModelMentor,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      };

      const course = await ModelCourse.findByPk(id, options);
      if (!course) throw { name: "NoData" };

      res.status(200).json(course);
    } catch (err) {
      next(err);
    }
  }

  static async updateCourse(req, res, next) {
    try {
      const id = +req.params.id;
      const { name, thumbnail, type, status, price, level, description, MentorId } = req.body;

      console.log(req.body);

      if (!MentorId) throw { name: "NotMentorId" };
      const mentor = await ModelMentor.findByPk(+MentorId);
      if (!mentor) throw { name: "NotFoundMentor" };

      const course = await ModelCourse.findByPk(id);
      if (!course) throw { name: "NotDataCourse" };

      if (req.file) {
        if (req.file.size > 4999999) throw { name: "ImgToMuchLarge" };

        const up = await cloudinary.uploader.upload(req.file.path, {
          eager_async: true,
        });

        if (up.created_at) {
          thumbnail = up.secure_url;
          fs.unlinkSync(req.file.path);
        }
      }

      await ModelCourse.update(
        { name, thumbnail, type, status, price, level, description, MentorId: mentor.id },
        { where: { id } }
      );

      res.status(200).json({
        id: course.id,
        message: "course updated successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async patchStatusCourse(req, res, next) {
    try {
      const id = +req.params.id;
      const { status } = req.body;
      console.log(status);

      const course = await ModelCourse.findByPk(id);
      if (!course) throw { name: "NotDataCourse" };

      await ModelCourse.update({ status }, { where: { id } });

      res.status(200).json({
        id: course.id,
        message: `course updated successfully with status ${status}`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async destroyCourse(req, res, next) {
    try {
      const id = +req.params.id;
      const options = {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      };

      const course = await ModelCourse.findByPk(id, options);
      if (!course) throw { name: "NotDataCourse" };

      await ModelCourse.destroy({ where: { id } });

      res.status(200).json({
        id: course.id,
        message: `course ${course.name} deleted successfully`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Course;
