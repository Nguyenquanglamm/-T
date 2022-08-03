const productBuilder = require("../controllers/productController");
const express = require("express");

const routes = express.Router();

routes.get("/", productBuilder.list_all_products);
routes.get("/:productId", productBuilder.read_a_product);
routes.post("/", productBuilder.uploadImage, productBuilder.create_a_product);
routes.put("/:productId", productBuilder.update_a_product);
routes.delete("/:productId", productBuilder.delete_a_product);

module.exports = routes;