const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  headline: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: false,
  }
},{
  timestamps: true,
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;