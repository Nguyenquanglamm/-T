const guaranteeBuilder = require("../controllers/guaranteeController");
const express = require("express");

const routes = express.Router();

routes.get("/", guaranteeBuilder.list_all_guarantees);
routes.post("/", guaranteeBuilder.create_a_guarantee);
routes.get("/:guaranteeId", guaranteeBuilder.read_a_guarantee);
routes.put("/:guaranteeId", guaranteeBuilder.update_a_guarantee);
routes.delete("/:guaranteeId", guaranteeBuilder.delete_a_guarantee);

module.exports = routes;