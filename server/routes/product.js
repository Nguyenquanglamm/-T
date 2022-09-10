const productBuilder = require("../controllers/productController");
const express = require("express");

const routes = express.Router();

routes.get("/", productBuilder.getAllProducts, productBuilder.getAllCategorys);
routes.get("/:productId", productBuilder.read_a_product);
routes.get("/v1/search", productBuilder.filterProduct);
routes.get("/v1/getInfo/:productdetailsId", productBuilder.getProInfo);
routes.post("/", productBuilder.uploadImage, productBuilder.create_a_product);
routes.put(
    "/:productId",
    productBuilder.uploadImage,
    productBuilder.update_a_product
  );
routes.delete("/:productId", productBuilder.delete_a_product);

module.exports = routes;