const productdetailsBuilder = require("../controllers/productdetailsController");
const express = require("express");

const routes = express.Router();

routes.get("/", productdetailsBuilder.list_all_productdetailss);
routes.get("/:productdetailsId", productdetailsBuilder.read_a_productdetails);
routes.get("/getInfoDetails/:productdetailsId", productdetailsBuilder.getInfoPro);
routes.post("/", productdetailsBuilder.uploadImage, productdetailsBuilder.create_a_productdetails);
routes.put("/:productdetailsId", productdetailsBuilder.update_a_productdetails);
routes.delete("/:productdetailsId", productdetailsBuilder.delete_a_productdetails);

module.exports = routes;