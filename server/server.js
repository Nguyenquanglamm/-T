// import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const db = require("./config/db/connect");
const PORT = 3001;

global.Product = require("./models/product");
global.category = require("./models/category");
global.ProductDetails = require("./models/productdetails");
global.promotion = require("./models/promotion");
global.guarantee = require("./models/guarantee");

const routes = require("./routes");

// set up dependencies

db.connect();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

routes(app);
app.listen(PORT);

// app.listen(PORT, () => {
//     console.log(Our server is running on port ${PORT});
//   });