const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a product name"],
    },
    price: {
      type: Number,
      required: [true, "please provide a product price"],
    },
    category: {
      type: String,
      required: [true, "please provide the product category"],
    },
    description: {
      type: String,
      required: [true, "please provide the product description"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("products", productSchema);

module.exports = Product;
