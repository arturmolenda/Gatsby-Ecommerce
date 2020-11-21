import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from 'express-async-handler';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      usedCoupons: user.usedCoupons,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user & get token
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const { user } = req;
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  let emailAccExists, updatedUser;
  if (await user.matchPassword(req.body.password)) {
    if (req.body.name) {
      if (req.body.name === user.name && req.body.email === user.email) {
        res.status(400);
        throw new Error('Nothing to update');
      }
      if (req.body.email && req.body.email !== user.email) {
        emailAccExists = await User.findOne({ email: req.body.email });
        if (emailAccExists) {
          res.status(400);
          throw new Error('User with this email already exists');
        }
      }
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      updatedUser = await user.save();
    } else {
      if (await user.matchPassword(req.body.newPassword)) {
        res.status(400);
        throw new Error('Passwords are the same');
      }
      user.password = req.body.newPassword;
      updatedUser = await user.save();
    }
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      usedCoupons: updatedUser.usedCoupons,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid password');
  }
});

// @desc    Get all users
// @route   Get /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  console.log(req.user);
  const user = await User.findOneAndDelete({ _id: req.params.id });
  if (user) {
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  updateUserProfile,
  getUserProfile,
  getUsers,
  deleteUser,
};
