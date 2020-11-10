import express from 'express';
import {
  getAllProducts,
  getProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(getProducts);
router.get('/all', protect, admin, getAllProducts);

export default router;
