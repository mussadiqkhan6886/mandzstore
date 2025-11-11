import mongoose from "mongoose";

const productSubSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  newPrice: { type: Number, default: null },
  onSale: { type: Boolean, default: false },
  images: { type: [String], required: true },
  colors: { type: [String], default: [] },
});

const categorySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }, // category name
  slug: { type: String, required: true, unique: true },
  mainDescription: {type: String, required: true},
  products: [productSubSchema], // array of products in this category
});

export const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
