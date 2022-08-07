const AboutMe = require("../models/about");
const cloudinary = require('../middlewares/cloudinary');
const fs = require('fs');




module.exports.postAbout = async (req, res) => {
  try {
    const urls = [];
    const uploader = async (path) => await cloudinary.uploads(path, 'Users');
    const files = req.files;
    for (const file of files) {
      const {
        path
      } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    console.log(urls);
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
    const myaboutMe = new AboutMe({
      images: urls,
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
    const newaboutMe = await myaboutMe.save();
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
    const {
      id
    } = req.params;
    const aboutMe = await AboutMe.findById(id);
    res.status(200).json({
      message: "about_me fetched successfully",
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

module.exports.updateAbout = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const aboutMe = await AboutMe.findById(id);
    console.log("aboutMe", aboutMe);
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
    if (!aboutMe) {
      return res.status(404).json({
        status: "error",
        msg: "about_me not found"
      });
    }
    if (firstName) aboutMe.firstName = firstName;
    if (lastName) aboutMe.lastName = lastName;
    if (phoneNumber) aboutMe.phoneNumber = phoneNumber;
    if (email) aboutMe.email = email;
    if (address) aboutMe.address = address;
    if (about_Me) aboutMe.about_Me = about_Me;
    if (gitHubLink) aboutMe.gitHubLink = gitHubLink;
    if (linkedInLink) aboutMe.linkedInLink = linkedInLink;
    if (twitterLink) aboutMe.twitterLink = twitterLink;
    const updatedaboutMe = await aboutMe.save();
    res.status(200).json({
      message: "about_me updated successfully",
      data: updatedaboutMe
    });
  } catch (err) {
    // console.log(err);
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
    if (!aboutMe) {
      return res.status(404).json({
        msg: "about_me not found"
      });
    }
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