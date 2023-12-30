const { Order, Car } = require('../models');

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();

    if (orders.length === 0) {
      res.status(404).json({ message: 'No orders found.' });
    } else {
      res.json(orders);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id, {
      include: {
        model: Car,
        as: 'car',
      },
    });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createOrder = async (req, res) => {
  const { car_id, order_date, pickup_date, dropoff_date, pickup_location, dropoff_location } = req.body;
  
  const formatDate = (date) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };
  
  try {
    const order = await Order.create({
      car_id,
      order_date: new Date(formatDate(order_date)),
      pickup_date: new Date(formatDate(pickup_date)),
      dropoff_date: new Date(formatDate(dropoff_date)),
      pickup_location,
      dropoff_location,
    });
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { car_id, order_date, pickup_date, dropoff_date, pickup_location, dropoff_location } = req.body;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    await order.update({
      car_id,
      order_date: new Date(order_date),
      pickup_date: new Date(pickup_date),
      dropoff_date: new Date(dropoff_date),
      pickup_location,
      dropoff_location,
    });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    await order.destroy();
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
