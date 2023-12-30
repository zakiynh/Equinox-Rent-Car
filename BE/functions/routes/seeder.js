const express = require('express');
const router = express.Router();
const { seedDatabase } = require('../seeders/20231230083959-car-seed')

router.get('/seed', async (req, res) => {
  try {
    await seedDatabase();
    res.status(200).json({ message: 'Seeding completed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Seeding failed.' });
  }
});

module.exports = router;