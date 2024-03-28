const Order = require('../models/Order');

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      createdBy: req.body.userId,
      totalAmount: req.body.totalAmount,
    });

    const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  createOrder,
};
