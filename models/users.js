const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  password: String,
  device: String,
  date: {
    type: String,
    default: Date.now(),
  },
});

// Model
const userPost = mongoose.model("Users", userSchema);

module.exports = userPost;
