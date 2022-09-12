const orderBuilder = require("../controllers/orderController");
const express = require("express");

const routes = express.Router();

routes.get("/", orderBuilder.list_all_orders);
routes.get("/getProfitNowMonth", orderBuilder.getProfitMonthly);
routes.get(
    "/getOrderByDateRange/startDate=:startDate&?endDate=:endDate",
    orderBuilder.getOrderByDateRange
  );
routes.get("/getProfitNowDay", orderBuilder.getProfitByDay);
routes.get("/v2/getPriceByTime/:id", orderBuilder.getPriceByTime);
routes.post("/", orderBuilder.create_a_order);
routes.get("/:idorder", orderBuilder.read_a_order);
routes.put("/:idorder", orderBuilder.update_a_order);
routes.delete("/:idorder", orderBuilder.delete_a_order);

module.exports = routes;