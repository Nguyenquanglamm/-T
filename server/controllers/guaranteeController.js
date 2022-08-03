const mongoose = require("mongoose");
const guarantee = mongoose.model("guarantee");
const multer = require("multer");
const path = require("path");




exports.list_all_guarantees = (req, res) => {
  guarantee.find({}, (err, guarantees) => {
    if (err) res.send(err);
    res.json(guarantees);
  });
};

exports.create_a_guarantee = (req, res) => {
  console.log(req.body);
  const newguarantee = new guarantee(req.body);
  newguarantee.save((err, guarantee) => {
    if (err) res.send(err);
    res.json(guarantee);  
  });
};

exports.read_a_guarantee = (req, res) => {
  guarantee.findById(req.params.guaranteeId, (err, guarantee) => {
    console.log("req.params.guaranteeId", req.params.guaranteeId);
    if (err) res.send(err);
    res.json(guarantee);
  });
};

exports.update_a_guarantee = (req, res) => {
  guarantee.findOneAndUpdate(
    { _id: req.params.guaranteeId },
    { $set: req.body },
    { new: true },
    (err, guarantee) => {
      if (err) res.send(err);
      res.json(guarantee);
    }
  );
};

exports.delete_a_guarantee = (req, res) => {
  guarantee.deleteOne({ _id: req.params.guaranteeId }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "guarantee successfully deleted",
      _id: req.params.guaranteeId,
    });
  });
};