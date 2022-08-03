const categoryBuilder = require("../controllers/categoryController");
const express = require("express");

const routes = express.Router();

routes.get("/", categoryBuilder.list_all_categorys);
routes.post("/", categoryBuilder.create_a_category);
routes.get("/:categoryId", categoryBuilder.read_a_category);
routes.put("/:categoryId", categoryBuilder.update_a_category);
routes.delete("/:categoryId", categoryBuilder.delete_a_category);

module.exports = routes;