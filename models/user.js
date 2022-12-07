'use strict';
const {createHash} = require('../helpers/bcrypt')
const calculator = require('../helpers/calculator')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: { msg: 'Email had been registered before' },
      allowNull: false,
      validate: {
        notNull: { msg: "Email is required" },
        notEmpty: { msg: "Email is required" },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password is required" },
        notEmpty: { msg: "Password is required" },
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Gender is required" },
        notEmpty: { msg: "Gender is required" },
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Age is required" },
        notEmpty: { msg: "Age is required" },
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "Weight is required"},
        notEmpty: {msg: "Weight is required"},
      }
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "Height is required"},
        notEmpty: {msg: "Height is required"},
      }
    },
    weeklyPhysicalActivity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Weekkly physical activity is required"},
        notEmpty: {msg: "Weekkly physical activity is required"},
      }
    },
    status: DataTypes.STRING,
    dailyCalories: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((users) => {
    users.status = 'unpaid'
    users.password = createHash(users.password)
    users.dailyCalories = Math.floor(calculator(users.gender, users.age, users.weight, users.height, users.weeklyPhysicalActivity))

  })
  return User;
};