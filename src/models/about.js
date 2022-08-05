const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aboutMeSchema = new Schema({
  images: {
    type: Array,
    required: [true, "two images must be included"],
  },
  firstName: {
    type: String,
    required: [true, "title must be included"],
  },
  lastName: {
    type: String,
    required: true,
    max: [60, "Headline must be less than 60 characters"],
  },
  phoneNumber: {
    type: String,
    required: [true, "phone number must be included"],
  },
  email: {
    type: String,
    required: [true, "email must be included"],
  },
  address: {
    type: String,
    required: [true, "address must be included"],
  },
  aboutMe: {
    type: String,
    required: false,
  },
  gitHubLink: {
    type: String,
    required: false
  },
  linkedInLink: {
    type: String,
    required: false
  },
  twitterLink: {
    type: String,
    required: false
  }
}, {
  timestamps: true,
});

const AboutMe = mongoose.model("AboutMe", aboutMeSchema);
module.exports = AboutMe;