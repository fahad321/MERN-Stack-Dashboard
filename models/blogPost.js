const mongoose = require("mongoose");

// Schema
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  name: String,
  start: String,
  end: String,
  date: {
    type: String,
    default: Date.now(),
  },
});

// Model
const BlogPost = mongoose.model("presidents", BlogPostSchema);

module.exports = BlogPost;
