const { Car } = require('../models');

const getAllCars = async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCarById = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createCar = async (req, res) => {
  const { car_name, day_rate, month_rate, image } = req.body;
  try {
    const car = await Car.create({ car_name, day_rate, month_rate, image });
    res.status(201).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateCar = async (req, res) => {
  const { id } = req.params;
  const { car_name, day_rate, month_rate, image } = req.body;
  try {
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    await car.update({ car_name, day_rate, month_rate, image });
    res.json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteCar = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    await car.destroy();
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
