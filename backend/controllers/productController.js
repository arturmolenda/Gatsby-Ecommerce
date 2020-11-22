import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import path from 'path';
import fs from 'fs';

// @desc    Get products
// @route   GET /api/products?id=
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const id = req.query.id;
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

// @desc    Get all products
// @route   GET /api/products/all
// @access  Private/Admin
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOneAndDelete({ _id: req.params.id });
  if (product) {
    const __dirname = path.resolve('frontend\\public\\images');
    if (product.images.length !== 0) {
      product.images.map((img) => {
        fs.unlink(path.join(__dirname, img.image), (err) => {
          if (err) console.error(err);
        });
      });
    }
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getAllProducts, deleteProduct };
