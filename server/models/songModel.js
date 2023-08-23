const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  genre: { type: String, required: true, trim: true },
  artist: { type: String, required: true, trim: true },
  duration: { type: Number, default: 0 },
  popularity: { type: Number, default: 0 },
  uploaded_at: { type: Date, default: Date.now() },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
