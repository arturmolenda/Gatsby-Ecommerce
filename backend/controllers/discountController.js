import Discount from '../models/discountModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Validate discount
// @route   POST /api/discounts/
// @access  Private
const validateDiscount = asyncHandler(async (req, res) => {
  const { coupon, price } = req.body;

  const discount = await Discount.findOne({ code: coupon });

  if (discount) {
    if (
      discount.isActive &&
      new Date().toISOString() < discount.expireDate.toISOString()
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

export { validateDiscount };
