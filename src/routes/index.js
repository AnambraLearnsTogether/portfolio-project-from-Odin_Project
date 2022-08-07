const express = require("express");
const router = express.Router();

const upload = require('../middlewares/multer.middleware');
const {
  postBlog,
  getAllWorks,
  getWorkById,
  deleteWorkById,
  updateWorkById
} = require("../controllers/projects");

const {
  postAbout,
  getAbout,
  updateAbout,
  deleteAbout
} = require("../controllers/about");

// project routes
router.route('/work')
  .get(getAllWorks)
  .post(upload.array('image', 1), postBlog);

// single project 
router.route('/work/:id')
  .get(getWorkById)
  .put(updateWorkById)
  .delete(deleteWorkById);

// user routes
router.route('/user')
  .post(upload.array('image', 2), postAbout);

router.route('/user/:id')
  .get(getAbout)
  .put(updateAbout)
  .delete(deleteAbout);

module.exports = router;