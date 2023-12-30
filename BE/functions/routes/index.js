const express = require('express');
const carRoutes = require('./carRoutes');
const orderRoutes = require('./orderRoutes');

const router = express.Router();

router.use('/api', carRoutes);
router.use('/api', orderRoutes);

module.exports = router;
