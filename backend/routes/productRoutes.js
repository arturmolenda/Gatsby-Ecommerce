import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProducts,
  editProduct,
  getTopProducts,
  createProductReview,
  resetProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.get('/all', protect, admin, getAllProducts);
router.get('/top', getTopProducts);
router.post('/reset', resetProducts);
router
  .route('/:id')
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, editProduct);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;
