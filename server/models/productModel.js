const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
  song: { type: String, required: true, trim: true },
  genres: { type: String, required: true, trim: true },
  artist: { type: String, required: true, trim: true },
  // featured_artist: { type: Array, unique: true },
  country: { type: String, required: true },
  love: { type: Number, default: 0 },
  year: { type: Number, default: new Date().getFullYear() },
  uploaded_by: { type: String, required: true, trim: true },
  uploaded_at: { type: Date, default: Date.now() },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
