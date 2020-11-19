import express from 'express';
import { validateDiscount } from '../controllers/discountController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, validateDiscount);

export default router;
