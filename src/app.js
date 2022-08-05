const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const xss = require('xss-clean');
const routes = require("./routes");
const error404 = require("./controllers/error");

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

// Routes
app.get("/", (req, res) => res.status(200).send("the server is running!"));
app.use("/api", routes);
app.all("*", error404);


module.exports = app;