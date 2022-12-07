const { Course, Chapter: ModelChapter } = require("../models");

class Chapter {
  static async getChapters(_req, res, next) {
    try {
      const options = {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["id", "ASC"]],
      };
      const data = await ModelChapter.findAll(options);

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async insertChapter(req, res, next) {
    try {
      let { name, CourseId } = req.body;

      if (!CourseId) throw { name: "NotDataCourse" };

      const course = await Course.findByPk(CourseId);
      if (!course) throw { name: "NotDataCourse" };

      const data = await ModelChapter.create({ name, CourseId: course.id });

      res.status(200).json({
        id: data.id,
        message: "chapter created successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async getChapter(req, res, next) {
    try {
      const id = +req.params.id;
      const options = {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      };

      const chapter = await ModelChapter.findByPk(id, options);
      if (!chapter) throw { name: "NoData" };

      res.status(200).json(chapter);
    } catch (err) {
      next(err);
    }
  }

  static async updateChapter(req, res, next) {
    try {
      const id = +req.params.id;
      let { name, CourseId } = req.body;

      if (!CourseId) throw { name: "NotDataCourse" };

      const course = await Course.findByPk(CourseId);
      if (!course) throw { name: "NotDataCourse" };

      const chapter = await ModelChapter.findByPk(id);
      if (!chapter) throw { name: "NoData" };

      await ModelChapter.update({ name, CourseId: course.id }, { where: { id: chapter.id } });

      res.status(200).json({
        id: chapter.id,
        message: "chapter updated successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async destroyChapter(req, res, next) {
    try {
      const id = +req.params.id;
      const options = {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      };

      const chapter = await ModelChapter.findByPk(id, options);
      if (!chapter) throw { name: "NoData" };

      await ModelChapter.destroy({ where: { id } });

      res.status(200).json({
        id: chapter.id,
        message: `chapter ${chapter.name} deleted successfully`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Chapter;
