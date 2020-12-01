import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProducts,
  editProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.get('/all', protect, admin, getAllProducts);
router
  .route('/:id')
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, editProduct);

export default router;
