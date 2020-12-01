import express from 'express';
import {
  validateDiscount,
  getAllDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount,
} from '../controllers/discountController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(protect, validateDiscount)
  .get(protect, admin, getAllDiscounts);
router
  .route('/:id')
  .put(protect, admin, updateDiscount)
  .delete(protect, admin, deleteDiscount);
router.route('/new').post(protect, admin, createDiscount);

export default router;
