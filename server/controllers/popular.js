const Product = require("../models/productModel");

const popular = async (req, res) => {
  try {
    const product = await Product.find({ love: { $gt: 0 } }).sort({
      love: -1,
    });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};

const related = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await Product.findById(id);
    const { genres, artist, _id } = data;
    const product = await Product.find({
      $and: [{ $or: [{ genres }, { artist }] }, { _id: { $ne: { _id } } }],
    });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { popular, related };
