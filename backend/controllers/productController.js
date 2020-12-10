import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import path from 'path';
import fs from 'fs';
import FileType from 'file-type';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

// @desc    Get products
// @route   GET /api/products?id=&pageNumber=&keyword=
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
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          $or: [
            { category: { $regex: req.query.keyword, $options: 'i' } },
            { brand: { $regex: req.query.keyword, $options: 'i' } },
            { name: { $regex: req.query.keyword, $options: 'i' } },
          ],
        }
      : {};
    const count = await Product.countDocuments({ show: true, ...keyword });
    const products = await Product.find({ show: true, ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  }
});

// @desc    Get all products
// @route   GET /api/products/all?pageNumber=&keyword=&rowsSize=
// @access  Private/Admin
const getAllProducts = asyncHandler(async (req, res) => {
  const rowsSize = Number(req.query.rowsSize) || 5;
  let page = Number(req.query.pageNumber) || 0;
  const keyword =
    req.query.keyword.trim() !== ''
      ? {
          $or: [
            { category: { $regex: req.query.keyword, $options: 'i' } },
            { brand: { $regex: req.query.keyword, $options: 'i' } },
            { name: { $regex: req.query.keyword, $options: 'i' } },
          ],
        }
      : {};
  const rows = await Product.countDocuments({ ...keyword });
  if (rowsSize * page >= rows && page !== 0) page = 0;
  const products = await Product.find({ ...keyword })
    .sort({ createdAt: -1 })
    .limit(rowsSize)
    .skip(rowsSize * page);

  res.json({ products, page, rows, rowsSize });
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
            if (err) {
              console.error(err);
              res.json(500);
              throw new Error('Deleting product failed');
            }
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

// @desc    Edit product
// @route   PUT /api/products/:id
// @access  Private/Admin
const editProduct = asyncHandler(async (req, res) => {
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
  const product = await Product.findById(req.params.id);
  if (product) {
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
        await product.updateOne({
          $set: {
            lastEditedBy: req.user._id,
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
          },
        });
        res.status(201).json(product._id);
      })
      .catch((err) => {
        console.log('ERROR!', err);
        res.status(500);
        throw new Error('Saving  failed');
      });
  } else {
    res.json(404);
    throw new Error('Product not found');
  }
});

// @desc   Get top rated products
// @route  GET /api/products/top?num=
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
  const productsNum = req.query.num ? Number(req.query.num) : 3;
  const products = await Product.find({})
    .sort({ rating: -1 })
    .limit(productsNum);
  res.json(products);
});

// @desc   Review product
// @route  POST /api/products/:id/reviews
// @access Public
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReview = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReview) {
      res.status(400);
      throw new Error('Product already review');
    }
    const review = {
      name: req.user.name.split(' ')[0],
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, item) => item.rating + a, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ product });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getAllProducts,
  deleteProduct,
  createProduct,
  editProduct,
  getTopProducts,
  createProductReview,
};
