const mongoose = require("mongoose");
const category = mongoose.model("category");
const multer = require("multer");
const path = require("path");




exports.list_all_categorys = (req, res) => {
  category.find({}, (err, categorys) => {
    if (err) res.send(err);
    res.json(categorys);
  });
};

exports.create_a_category = (req, res) => {
  console.log(req.body);
  const newcategory = new category(req.body);
  newcategory.save((err, category) => {
    if (err) res.send(err);
    res.json(category);  
  });
};

exports.read_a_category = (req, res) => {
  category.findById(req.params.categoryId, (err, category) => {
    console.log("req.params.categoryId", req.params.categoryId);
    if (err) res.send(err);
    res.json(category);
  });
};

exports.update_a_category = (req, res) => {
  category.findOneAndUpdate(
    { _id: req.params.categoryId },
    { $set: req.body },
    { new: true },
    (err, category) => {
      if (err) res.send(err);
      res.json(category);
    }
  );
};

exports.delete_a_category = (req, res) => {
  category.deleteOne({ _id: req.params.categoryId }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "category successfully deleted",
      _id: req.params.categoryId,
    });
  });
};