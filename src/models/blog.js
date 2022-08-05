const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workSchema = new Schema({
  image: {
    type: Array,
    required: false,
  },
  title: {
    type: String,
    required: [true, "title must be included"],
  },
  headline: {
    type: String,
    required: true,
    max: [60, "Headline must be less than 60 characters"],
  },
  githubUrl: {
    type: String,
    required: false,
  },
  liveLink:{
    type: String,
    required: false
  }
},{
  timestamps: true,
});

const Work = mongoose.model("Work", workSchema);
module.exports = Work;