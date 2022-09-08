const supplierBuilder = require("../controllers/supplierController");
const express = require("express");

const routes = express.Router();

routes.get("/", supplierBuilder.list_all_suppliers);
routes.post("/", supplierBuilder.create_a_supplier);
routes.get("/:supplierId", supplierBuilder.read_a_supplier);
routes.put("/:supplierId", supplierBuilder.update_a_supplier);
routes.delete("/:supplierId", supplierBuilder.delete_a_supplier);

module.exports = routes;