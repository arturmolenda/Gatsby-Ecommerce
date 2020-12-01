import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Discount from '../models/discountModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    price,
    totalPrice,
    shippingPrice,
    coupon,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('Order is empty');
  } else {
    const order = new Order({
      user: {
        name: req.user.name,
        email: req.user.email,
        _id: req.user._id,
      },
      orderItems,
      shippingAddress,
      paymentMethod,
      price,
      totalPrice, // price with coupon and shipping
      shippingPrice,
      coupon,
    });
    if (coupon) {
      const discount = await Discount.findOneAndUpdate(
        { code: coupon.code },
        { $inc: { couponsAmount: -1 } }
      );
      await User.updateOne(
        { _id: req.user._id },
        { $push: { usedCoupons: discount._id } }
      );
    }
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    if (!(req.user.isAdmin || order.user._id.equals(req.user._id))) {
      res.status(401);
      throw new Error('Not authorized');
    }
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ 'user._id': req.user._id }).sort({
    createdAt: -1,
  });
  res.json(orders);
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    await order.save();
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to shipped
// @route   PUT /api/orders/:id/ship
// @access  Private/Admin
const updateOrderToShipped = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.shipped = true;
    order.shippedAt = new Date().toISOString();
    order.tracking = req.body.tracking;
    await order.save();
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get all orders
// @route   GET /api/orders/all
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOneAndDelete({ _id: req.params.id });
  if (order) {
    res.json({ message: 'Order deleted' });
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export {
  createOrder,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
  updateOrderToShipped,
  getAllOrders,
  deleteOrder,
};
