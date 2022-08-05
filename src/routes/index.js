const express = require("express");
const router = express.Router();

const upload = require('../middlewares/multer.middleware');
const postBlog = require("../controllers/projects");
const aboutMe = require("../controllers/aboutme");

// blog routes
router.route('/work')
  .get()
  .post(upload.array('image',1), postBlog)
  .put()
  .delete();

// user routes
router.route('/user')
  .get()
  .post(upload.array('image',2), aboutMe)
  .put()
  .delete();


module.exports = router;