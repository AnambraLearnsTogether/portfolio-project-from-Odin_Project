const express = require("express");
const router = express.Router();

// post a blog

router.route('/blog')
  .get()
  .post()
  .put()
  .delete()


module.exports = router;