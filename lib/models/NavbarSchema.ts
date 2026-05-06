import mongoose, { Schema, models, model } from "mongoose";

const ChildSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
});

const NavbarSchema = new Schema(
  {
    title: { type: String, required: true },
    link: { type: String, default: "" },
    children: [ChildSchema], // array of children
  },
  { timestamps: true }
);

const Navbar =
  models.Navbar || model("Navbar", NavbarSchema);

export default Navbar;