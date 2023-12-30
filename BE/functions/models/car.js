'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Car.hasMany(models.Order, {
        foreignKey: 'car_id'
      })
    }
  }
  Car.init({
    car_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    day_rate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    month_rate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};