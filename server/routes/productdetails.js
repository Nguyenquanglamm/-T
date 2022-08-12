const productdetailsBuilder = require("../controllers/productdetailsController");
const express = require("express");

const routes = express.Router();

routes.get("/", productdetailsBuilder.list_all_productdetailss);
routes.get("/details", productdetailsBuilder.getAllProductDetails);
routes.get("/detail/:idSanPham", productdetailsBuilder.getProductDetails);
routes.get("/:productdetailsId", productdetailsBuilder.read_a_productdetails);
routes.get("/getInfoDetails/:productdetailsId", productdetailsBuilder.getInfoPro);
routes.get("/checkDetails/?proID=:proID&?mausac=:mausac&?dungluong=:dungluong", productdetailsBuilder.checkProductDetails);
routes.post("/", productdetailsBuilder.uploadImage, productdetailsBuilder.create_a_productdetails);
routes.put("/:productdetailsId", productdetailsBuilder.update_a_productdetails);
routes.put("/updateQuantity/?infoId=:infoId&?mausac=:mausac&?dungluong=:dungluong&?quantity=:quantity", productdetailsBuilder.UpdateQuantity);
routes.delete("/:productdetailsId", productdetailsBuilder.delete_a_productdetails);

module.exports = routes;