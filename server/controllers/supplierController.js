const mongoose = require("mongoose");
const supplier = mongoose.model("supplier");
const multer = require("multer");
const path = require("path");




exports.list_all_suppliers = (req, res) => {
  supplier.find({}, (err, suppliers) => {
    if (err) res.send(err);
    res.json(suppliers);
  });
};

exports.create_a_supplier = (req, res) => {
  console.log(req.body);
  const newsupplier = new supplier(req.body);
  newsupplier.save((err, supplier) => {
    if (err) res.send(err);
    res.json(supplier);  
  });
};

exports.read_a_supplier = (req, res) => {
  supplier.findById(req.params.supplierId, (err, supplier) => {
    console.log("req.params.supplierId", req.params.supplierId);
    if (err) res.send(err);
    res.json(supplier);
  });
};

exports.update_a_supplier = (req, res) => {
  supplier.findOneAndUpdate(
    { _id: req.params.supplierId },
    { $set: req.body },
    { new: true },
    (err, supplier) => {
      if (err) res.send(err);
      res.json(supplier);
    }
  );
};

exports.delete_a_supplier = (req, res) => {
  supplier.deleteOne({ _id: req.params.supplierId }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "supplier successfully deleted",
      _id: req.params.supplierId,
    });
  });
};