const mongoose = require("mongoose");
const promotion = mongoose.model("promotion");
const multer = require("multer");
const path = require("path");




exports.list_all_promotions = (req, res) => {
  promotion.find({}, (err, promotions) => {
    if (err) res.send(err);
    res.json(promotions);
  });
};

exports.create_a_promotion = (req, res) => {
  console.log(req.body);
  const newpromotion = new promotion(req.body);
  newpromotion.save((err, promotion) => {
    if (err) res.send(err);
    res.json(promotion);  
  });
};

exports.read_a_promotion = (req, res) => {
  promotion.findById(req.params.promotionId, (err, promotion) => {
    console.log("req.params.promotionId", req.params.promotionId);
    if (err) res.send(err);
    res.json(promotion);
  });
};

exports.update_a_promotion = (req, res) => {
  promotion.findOneAndUpdate(
    { _id: req.params.promotionId },
    { $set: req.body },
    { new: true },
    (err, promotion) => {
      if (err) res.send(err);
      res.json(promotion);
    }
  );
};

exports.delete_a_promotion = (req, res) => {
  promotion.deleteOne({ _id: req.params.promotionId }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "promotion successfully deleted",
      _id: req.params.promotionId,
    });
  });
};