const AboutMe = require("../models/about");
const cloudinary = require('../middlewares/cloudinary');
const fs = require('fs');




module.exports.postAbout = async (req, res) => {
  try {
    const uploader = async (path) => await cloudinary.uploads(path, 'images');
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const {
        path
      } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
      about_Me,
      gitHubLink,
      linkedInLink,
      twitterLink
    } = req.body;
    const aboutMe = new AboutMe({
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
      about_Me,
      gitHubLink,
      linkedInLink,
      twitterLink,
      image: urls,
    });
    // console.log(work);
    const newaboutMe = await aboutMe.save();

    res.status(200).json({
      message: "images uploaded successfully",
      data: newaboutMe
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      msg: err.message
    });
  }
};

module.exports.getAbout = async (req, res) => {
  try {
    const about_Me = await AboutMe.find();
    res.status(200).json({
      message: "about_me fetched successfully",
      data: about_Me
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      msg: err.message
    });
  }
};

module.exports.updateAbout = async (req, res) => {
  try {
    const { 
      id
    } = req.params;
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
      about_Me,
      gitHubLink,
      linkedInLink,
      twitterLink
    } = req.body;
    const aboutMe = await AboutMe.findByIdAndUpdate(id, {
      firstName,
      lastName,
      phoneNumber,
      email,
      address,
      about_Me,
      gitHubLink,
      linkedInLink,
      twitterLink,
    });
    res.status(200).json({
      message: "about_me updated successfully",
      data: aboutMe
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      msg: err.message
    });
  }
};


module.exports.deleteAbout = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const aboutMe = await AboutMe.findByIdAndDelete(id);
    res.status(200).json({
      message: "about_me deleted successfully",
      data: aboutMe
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      msg: err.message
    });
  }
};