import Discount from '../models/discountModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Validate discount
// @route   POST /api/discounts
// @access  Private
const validateDiscount = asyncHandler(async (req, res) => {
  const { coupon, price } = req.body;

  const discount = await Discount.findOne({ code: coupon });
  if (discount) {
    if (
      discount.isActive &&
      new Date().toISOString() < discount.expireDate.toISOString() &&
      discount.couponsAmount > 0
    ) {
      if (discount.onePerUser) {
        const usedCoupons = req.user.usedCoupons;
        const couponUsed = usedCoupons.indexOf(discount._id);
        if (couponUsed !== -1) {
          res.status(400);
          throw new Error('Coupon was already used');
        }
      }
      if (price >= discount.minPrice && price !== 0) {
        let newPrice = discount.isPercent
          ? (
              parseFloat(price) -
              (parseFloat(price) * (discount.amount / 100)).toFixed(2)
            ).toFixed(2)
          : parseFloat(price) - discount.amount;
        newPrice < 0 ? 0 : newPrice;
        res.json({
          newPrice,
          code: coupon,
          amount: discount.amount,
          isPercent: discount.isPercent,
        });
      } else {
        res.status(400);
        throw new Error(
          `Your order must be over $${discount.minPrice} to use this coupon`
        );
      }
    } else {
      res.status(400);
      throw new Error('Coupon is not active');
    }
  } else {
    res.status(404);
    throw new Error('Entered coupon does not exist');
  }
});

// @desc    Get all discounts
// @route   GET /api/discounts?id=
// @access  Private/Admin
const getAllDiscounts = asyncHandler(async (req, res) => {
  const id = req.query.id;
  if (id) {
    const discount = await Discount.findById(id);
    if (discount) {
      res.json(discount);
    } else {
      res.status(404);
      throw new Error('Discount not found');
    }
  } else {
    const discounts = await Discount.find().sort({ createdAt: -1 });
    res.json(discounts);
  }
});

// @desc    Create new discount
// @route   POST /api/discounts/new
// @access  Private/Admin
const createDiscount = asyncHandler(async (req, res) => {
  const {
    code,
    isPercent,
    minPrice,
    amount,
    expireDate,
    couponsAmount,
    onePerUser,
    isActive,
  } = req.body;
  const discountExists = await Discount.findOne({ code });
  if (discountExists) {
    res.status(500);
    throw new Error('Discount with this code already exists');
  } else {
    const createdDiscount = new Discount({
      user: req.user._id,
      code,
      isPercent,
      minPrice,
      amount,
      expireDate,
      couponsAmount,
      onePerUser,
      isActive,
    });
    await createdDiscount.save();
    res.json(createdDiscount._id);
  }
});

// @desc    Update discount
// @route   PUT /api/discounts/:id
// @access  Private/Admin
const updateDiscount = asyncHandler(async (req, res) => {
  const discount = await Discount.findById(req.params.id);
  if (discount) {
    const {
      code,
      isPercent,
      minPrice,
      amount,
      expireDate,
      couponsAmount,
      onePerUser,
      isActive,
    } = req.body;
    discount.code = code;
    discount.isPercent = isPercent;
    discount.minPrice = minPrice;
    discount.amount = amount;
    discount.expireDate = expireDate;
    discount.couponsAmount = couponsAmount;
    discount.onePerUser = onePerUser;
    discount.isActive = isActive;
    await discount.save();
    res.json(discount);
  } else {
    res.status(404);
    throw new Error('Discount not found');
  }
});

// @desc    Delete discount
// @route   DELETE /api/discounts/:id
// @access  Private/Admin
const deleteDiscount = asyncHandler(async (req, res) => {
  const discount = await Discount.findOneAndDelete({ _id: req.params.id });
  if (discount) {
    res.json({ message: 'Discount deleted' });
  } else {
    res.status(404);
    throw new Error('Discount not found');
  }
});

export {
  validateDiscount,
  getAllDiscounts,
  createDiscount,
  updateDiscount,
  deleteDiscount,
};
