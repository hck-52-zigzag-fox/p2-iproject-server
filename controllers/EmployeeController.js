const { Employee, Category } = require("../models");

class EmployeeController {
  static async readEmployee(req, res, next) {
    try {
      const employee = await Employee.findAll({
        include: {
          model: Category,
          attributes: ["name"],
        },
      });
      res.status(200).json(employee);
    } catch (err) {
      next(err);
    }
  }

  static async findEmployee(req, res, next) {
    try {
      const id = req.params.id;
      const employee = await Employee.findByPk(id, {
        include: {
          model: Category,
          attributes: ["name"],
        },
      });

      if (!employee) {
        throw { name: "NOT_FOUND" };
      }

      res.status(200).json(employee);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EmployeeController;
