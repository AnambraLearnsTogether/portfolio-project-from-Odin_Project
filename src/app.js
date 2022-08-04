const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const xss = require('xss-clean');

const cloudinary = require('./middlewares/cloudinary');
const upload = require('./middlewares/multer.middleware');
const fs = require('fs');
const Blog = require("./models/blog");
const routes = require("./routes");


// API security and accessibility packages
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(morgan("dev"));



// express post parser
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// serve static files
app.use("/uploads", express.static(__dirname + "/uploads"));




// PING
app.get("/", (req, res) => res.status(200).send("the server is running!"));
app.use("/api", routes);

app.post('/blog', upload.array('image'), async (req, res) => {
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
      body
    } = req.body;
    const blog = new Blog({
      title,
      headline,
      body,
      images: urls
    });
    const newBlog = await blog.save();

    res.status(200).json({
      message: "images uploaded successfully",
      data: newBlog
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: err.message
    });
  }
});


// Not Found route
app.all("*", (req, res) => {
  res.status(404).json({
    status: "failed",
    message: "Can't find " + req.originalUrl + " on this server",
  });
});


module.exports = app;