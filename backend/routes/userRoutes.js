import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  authUser,
  deleteUser,
  registerUser,
} from '../controllers/userController.js';
const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/:id').delete(protect, admin, deleteUser);

export default router;
