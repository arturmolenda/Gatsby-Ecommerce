import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  authUser,
  deleteUser,
  registerUser,
  getUsers,
} from '../controllers/userController.js';
const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.route('/:id').delete(protect, admin, deleteUser);

export default router;
