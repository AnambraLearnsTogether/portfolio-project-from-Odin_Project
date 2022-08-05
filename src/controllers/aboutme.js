module.exports = (req,res) => {
  res.status(200).json({
    message: "the server is running!"
  });
};