import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import path from 'path';
import fs from 'fs';
import FileType from 'file-type';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

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
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOneAndDelete({ _id: req.params.id });
  if (product) {
    const __dirname = path.resolve();
    if (product.images.length !== 0) {
      product.images.map((img) => {
        fs.unlink(
          path.join(__dirname, `/frontend/public/images/${img.image}`),
          (err) => {
            if (err) console.error(err);
          }
        );
      });
    }
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create product
// @route   POST /api/products/
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    images,
    category,
    description,
    labels,
    price,
    discount,
    show,
    countInStock,
  } = req.body;
  const __dirname = path.resolve();
  const productImages = images.map(async (obj) => {
    if (obj.local || obj.formData) {
      return { image: obj.image, description: obj.description };
    } else if (!obj.formData && !obj.local) {
      // download image
      const response = await fetch(obj.image);
      const buffer = await response.buffer();
      const type = await FileType.fromBuffer(buffer);
      const fileName = `${uuidv4()}.${type.ext}`;

      fs.writeFile(
        path.join(__dirname, `/frontend/public/images/${fileName}`),
        buffer,
        () => console.log('done')
      );
      return {
        image: fileName,
        description: obj.description,
      };
    }
  });
  await Promise.all(productImages)
    .then(async (result) => {
      const createdProduct = new Product({
        user: req.user._id,
        name,
        brand,
        images: result,
        category,
        description,
        labels,
        price,
        discount: {
          amount: discount.amount,
          expireDate: discount.expireDate,
          totalPrice: discount.totalPrice,
        },
        show,
        countInStock,
      });
      await createdProduct.save();
      res.status(201).json(createdProduct._id);
    })
    .catch((err) => {
      console.log('ERROR!', err);
      res.status(500);
      throw new Error('Saving  failed');
    });
});

export { getProducts, getAllProducts, deleteProduct, createProduct };
