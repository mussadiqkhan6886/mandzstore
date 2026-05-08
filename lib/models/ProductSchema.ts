import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Design 1, Design 2
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  image: { type: [String], required: true },
  sku: { type: String }, // optional but powerful
  onSale: { type: Boolean, default: false },
  newPrice: { type: Number, default: null },
});

const ProductSchema = new mongoose.Schema(
  {
    collection: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    variants: [VariantSchema], // 🔥 MAIN FEATURE
  },
  { timestamps: true }
);

export const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);