

const postBlog = async (req,res){
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
}
};