import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Get products
// @route   POST /api/products?id=
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const id = req.query.id;
  console.log(req.query.id);
  if (id) {
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  } else {
    const products = await Product.find({ show: true });
    res.json(products);
  }
});

// @desc    Get products
// @route   POST /api/products/all
// @access  Private/Admin
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

export { getProducts, getAllProducts };
