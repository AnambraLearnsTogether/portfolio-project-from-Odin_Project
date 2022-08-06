const cloudinary = require('../middlewares/cloudinary');
const fs = require('fs');
const Work = require("../models/projects");

module.exports.postBlog = async (req, res) => {
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
      title,
      headline,
      githubUrl,
      liveLink,
    } = req.body;
    const work = new Work({
      title,
      headline,
      githubUrl,
      liveLink,
      image: urls,
    });
    // console.log(work);
    const newWork = await work.save();

    res.status(200).json({
      message: "images uploaded successfully",
      data: newWork
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: err.message
    });
  }
};

module.exports.getAllWorks = async (req, res) => {
  try {
    const works = await Work.find();
    res.status(200).json({
      message: "all works fetched successfully",
      data: works
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: err.message
    });
  }
};

module.exports.getWorkById = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const work = await Work.findById(id);
    res.status(200).json({
      message: "work fetched successfully",
      data: work
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: err.message
    });
  }
};

module.exports.deleteWorkById = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const work = await Work.findByIdAndDelete(id);
    res.status(200).json({
      message: "work deleted successfully",
      data: work
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: err.message
    });
  }
};

module.exports.updateWorkById = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const {
      title,
      headline,
      githubUrl,
      liveLink,
    } = req.body;
    const work = await Work.findByIdAndUpdate(id, {
      title,
      headline,
      githubUrl,
      liveLink,
    });
    res.status(200).json({
      message: "work updated successfully",
      data: work
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: err.message
    });
  }
};