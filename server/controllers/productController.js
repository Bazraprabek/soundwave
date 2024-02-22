const Product = require("../models/productModel");

const fetchProduct = async (req, res) => {
  try {
    const result = await Product.find({});
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

const fetchProductByEmail = async (req, res) => {
  try {
    const uploaded_by = req.params.email;
    const result = await Product.find({ uploaded_by });
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

const fetchProductById = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await Product.findById({ _id });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(400).send({ msg: "Song not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await Product.findById(id);
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ msg: "Product not found" });
    console.log(err);
  }
};

const createProduct = async (req, res) => {
  try {
    const { title, genres, artist, year, uploaded_by, country } = req.body;
    const song = req.files["song"][0].filename;
    const image = req.files["image"][0].filename;
    if (title && genres && artist && year && uploaded_by) {
      const result = await Product.create({
        title,
        song,
        genres,
        artist,
        country,
        image,
        year,
        uploaded_by,
      });
      if (result) {
        console.log("Uploaded Successfully");
        res.status(200).json({ msg: "Uploaded Successfully" });
      }
    } else {
      throw new Error("Fill all fields");
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Fail to create" });
  }
};

const productDelete = async (req, res) => {
  try {
    const result = await Product.deleteMany({});
    console.log(result);
    res.status(200).json({ msg: "Deleted" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Delete Fail" });
  }
};

module.exports = {
  fetchProduct,
  createProduct,
  getProduct,
  productDelete,
  fetchProductByEmail,
  fetchProductById,
};
