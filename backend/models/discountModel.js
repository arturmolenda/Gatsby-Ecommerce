import mongoose from 'mongoose';

const discountSchema = mongoose.Schema(
  {
    code: { type: String, require: true, unique: true },
    isPercent: { type: Boolean, require: true, default: true },
    amount: { type: Number, required: true },
    expireDate: { type: String, require: true },
    couponsAmmount: { type: Number, require: false, default: 999999 },
    onePerUser: { type: Boolean, require: false, default: false },
    isActive: { type: Boolean, require: true, default: true },
  },
  {
    timestamps: true,
  }
);

const Discount = mongoose.model('Discount', discountSchema);

export default Discount;
