import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import {
  authUser,
  deleteUser,
  registerUser,
  getUsers,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.route('/:id').delete(protect, admin, deleteUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
