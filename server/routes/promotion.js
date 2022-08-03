const promotionBuilder = require("../controllers/promotionController");
const express = require("express");
const routes = express.Router();

routes.get("/", promotionBuilder.list_all_promotions);
routes.post("/", promotionBuilder.create_a_promotion);
routes.get("/:promotionId", promotionBuilder.read_a_promotion);
routes.put("/:promotionId", promotionBuilder.update_a_promotion);
routes.delete("/:promotionId", promotionBuilder.delete_a_promotion);

module.exports = routes;