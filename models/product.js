import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    images: [
      { primary: { type: String, required: true } },
      { secondary: { type: String, required: true } },
      { modelFront: { type: String } },
      { modelBack: { type: String } },
      { materialCloseUp: { type: String } },
    ],
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    color: { type: [String], required: true },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    details: { type: [String], required: true },
    sku: { type: String, required: true },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
