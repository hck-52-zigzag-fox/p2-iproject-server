'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Object extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Object.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:{
        msg:"Object name is already discovered"
      },
      validate:{
        notEmpty:{
          msg:"Name cannot be empty"
        },
        notNull:{
          msg:"Name cannot be empty"
        }
      }
    },
    discoveredBy: DataTypes.STRING,
    discoveryDate: DataTypes.STRING,
    imageUrl: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Object appearance cannot be empty"
        },
        notNull:{
          msg:"Object appearance cannot be empty"
        }
      }
    },
    customObject: DataTypes.BOOLEAN,
    type: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Type cannot be empty"
        },
        notNull:{
          msg:"Type cannot be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Object',
  });
  return Object;
};