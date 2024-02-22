const generateToken = require("../config/generateToken");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");

const fetchData = async (req, res) => {
  try {
    const user = await User.find({}).select("-password");
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(401).send({ msg: "Unauthorized User" });
  }
};

const getData = async (req, res) => {
  try {
    const id = req.verifyUserId;
    const user = await User.findById(id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(401).send({ msg: "Unauthorized User" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const verifyEmail = await User.findOne({ email });
      if (verifyEmail) {
        const isMatch = await bcryptjs.compare(password, verifyEmail.password);
        if (isMatch) {
          const token = generateToken(verifyEmail._id);
          // res.cookie("token", token, {
          //   expires: new Date(Date.now() + 86400000),
          //   httpOnly: true,
          // });
          res.json({
            msg: "Login Successful",
            status: "success",
            accessToken: token,
          });
        } else {
          res.json({ msg: "Invalid Password" });
        }
      } else {
        res.json({ msg: "Invalid Email" });
      }
    } else {
      res.json({ msg: "Please fill all fields" });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Login Fail" });
  }
};

const userSignup = async (req, res) => {
  try {
    const { name, email, password, role, country } = req.body;
    if (name && email && password && role && country) {
      const verifyEmail = await User.findOne({ email });
      if (verifyEmail) {
        res.json({ msg: "Email already registered" });
      } else {
        const str1 = name.charAt(0).toUpperCase() + name.slice(1);
        const signup = await User.create({
          name: str1,
          email,
          role,
          country,
          password,
        });
        if (signup) {
          res.json({ msg: "Signup Successful", status: "success" });
        }
      }
    } else {
      res.json({ msg: "Please fill all fields" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: "Signup Fail" });
  }
};

const userDelete = async (req, res) => {
  try {
    const result = await User.deleteMany({});
    console.log(result);
    res.status(200).json({ msg: "Deleted" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Delete Fail" });
  }
};

const userDeleteByID = async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await User.deleteOne({ _id });
    console.log(result);
    res.status(200).json({ msg: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: "Delete Fail" });
  }
};

const adduserReview = async (req, res) => {
  try {
    const productt = await Product.findById(req.body.data._id).select("-love");

    const result = await User.findOneAndUpdate(
      { _id: req.verifyUserId },
      {
        $push: { review: productt },
      },
      { new: true }
    );
    const product = await Product.findById(req.body.data._id);
    if (result) {
      const addLove = await Product.findOneAndUpdate(
        { _id: req.body.data._id },
        {
          love: product.love + 1,
        },
        { new: true }
      );
      if (addLove) {
        res.status(200).json({ msg: "Review Done" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: "Love Fail" });
  }
};

const removeuserReview = async (req, res) => {
  try {
    const productt = await Product.findById(req.body.data._id).select("-love");
    const result = await User.findOneAndUpdate(
      { _id: req.verifyUserId },
      { $pull: { review: productt } },
      { new: true }
    );
    const product = await Product.findById(req.body.data._id);

    if (result) {
      const removeLove = await Product.findOneAndUpdate(
        { _id: req.body.data._id },
        {
          love: product.love - 1,
        },
        { new: true }
      );
      if (removeLove) {
        res.status(200).json({ msg: "Review Removed" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: "Unlove Fail" });
  }
};

module.exports = {
  userLogin,
  userSignup,
  getData,
  fetchData,
  userDelete,
  userDeleteByID,
  adduserReview,
  removeuserReview,
};
