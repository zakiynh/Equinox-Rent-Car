'use strict';
const cars = require('./cars.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    cars.forEach(car => {
      car.createdAt = new Date()
      car.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Cars', cars, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cars', null, {})
  }
};
