import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Get products
// @route   POST /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ show: true });
  res.json(products);
});

// @desc    Get products
// @route   POST /api/products/all
// @access  Private/Admin
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

export { getProducts, getAllProducts };
