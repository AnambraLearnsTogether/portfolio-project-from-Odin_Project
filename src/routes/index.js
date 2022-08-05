const express = require("express");
const router = express.Router();

const upload = require('../middlewares/multer.middleware');
const postBlog = require("../controllers/blog");

// blog routes
router.route('/blog')
  .get()
  .post(upload.array('image',1), postBlog)
  .put()
  .delete();

// user routes
router.route('/user')
  .get()
  .post()
  .put()
  .delete();


module.exports = router;