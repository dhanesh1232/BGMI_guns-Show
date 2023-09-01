const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  gun_power: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  gun_ammo: {
    type: String,
    required: true,
  },
  gun_type: {
    type: String,
    required: true,
  },
  is_like: {
    type: Boolean,
    required: true,
  },
  like_count: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("image", ImageSchema);
