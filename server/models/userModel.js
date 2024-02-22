const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, tirm: true },
  email: { type: String, required: true, trim: true, unique: true },
  role: {
    type: String,
    enum: ["artist", "user"],
  },
  country: { type: String, required: true },
  review: { type: Array, unique: true },
  password: { type: String, required: true, trim: true },
  created_at: { type: Date, default: Date.now() },
});

userSchema.pre("save", async function () {
  this.password = await bcryptjs.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
