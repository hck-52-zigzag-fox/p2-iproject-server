const { Lesson: ModelLesson, Chapter } = require("../models");
const cloudinary = require("../helpers/cloudinary");
const fs = require("fs");

class Lesson {
  static async getLessons(req, res, next) {
    try {
      const options = {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["id", "ASC"]],
      };
      const data = await ModelLesson.findAll(options);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async insertLesson(req, res, next) {
    try {
      let { name, ChapterId, video } = req.body;

      if (!ChapterId) throw { name: "NoData" };

      const chapter = await Chapter.findByPk(ChapterId);
      if (!chapter) throw { name: "NoData" };

      if (req.file) {
        const up = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "video",
          eager_async: true,
        });

        if (up.created_at) {
          video = up.secure_url;
          fs.unlinkSync(req.file.path);
        }
      }

      const data = await ModelLesson.create({ name, video, ChapterId: chapter.id });

      res.status(200).json({
        id: data.id,
        message: "lesson created successfully",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getLesson(req, res, next) {
    try {
      const id = +req.params.id;
      const options = {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      };

      const lesson = await ModelLesson.findByPk(id, options);
      if (!lesson) throw { name: "NoData" };

      res.status(200).json(lesson);
    } catch (err) {
      next(err);
    }
  }

  static async updateLesson(req, res, next) {
    try {
      const id = +req.params.id;

      let { name, ChapterId, video } = req.body;

      if (!ChapterId) throw { name: "NoData" };

      const chapter = await Chapter.findByPk(ChapterId);
      if (!chapter) throw { name: "NoData" };

      if (req.file) {
        const up = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "video",
          eager_async: true,
        });

        if (up.created_at) {
          video = up.secure_url;
          fs.unlinkSync(req.file.path);
        }
      }

      await ModelChapter.update({ name, video, ChapterId: chapter.id }, { where: { id } });

      res.status(200).json({
        id: chapter.id,
        message: "lesson updated successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async destroyLesson(req, res, next) {
    try {
      const id = +req.params.id;
      const options = {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      };

      const lesson = await ModelLesson.findByPk(id, options);
      if (!lesson) throw { name: "NoData" };

      await ModelLesson.destroy({ where: { id } });

      res.status(200).json({
        id: lesson.id,
        message: `lesson ${lesson.name} deleted successfully`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Lesson;
