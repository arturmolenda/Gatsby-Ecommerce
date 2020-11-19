import mongoose from 'mongoose';

const discountSchema = mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    isPercent: { type: Boolean, required: true, default: true },
    minPrice: { type: Number, required: true, default: 0 },
    amount: { type: Number, required: true },
    expireDate: { type: Date, required: true },
    couponsAmount: { type: Number, required: false, default: 999999 },
    onePerUser: { type: Boolean, required: false, default: false },
    isActive: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

const Discount = mongoose.model('Discount', discountSchema);

export default Discount;
