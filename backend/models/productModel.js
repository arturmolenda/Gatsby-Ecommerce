import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const labelSchema = mongoose.Schema({
  labelText: { type: String, required: true },
  color: { type: String, required: true, default: '#000' },
  bgColor: { type: String, required: true, default: '#fff' },
});

const imageSchema = mongoose.Schema({
  image: { type: String, required: true },
  description: { type: String, required: false },
});

const productSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    images: [imageSchema],
    labels: [labelSchema],
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    discount: {
      amount: { type: Number, required: false, default: 0 },
      expireDate: {
        type: Date,
        required: false,
        default: new Date().toISOString().substring(0, 10),
      },
      totalPrice: { type: Number, required: false, default: 0 },
    },
    show: { type: Boolean, required: true, default: true },
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
