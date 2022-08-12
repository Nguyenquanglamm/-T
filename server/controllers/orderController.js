const mongoose = require("mongoose");
const order = mongoose.model("order");

exports.list_all_orders = (req, res) => {
  order.find({}, (err, orders) => {
    if (err) res.send(err);
    res.json(orders);
  });
};

exports.create_a_order = (req, res) => {
  const neworder = new order(req.body);
  neworder.save((err, order) => {
    if (err) res.send(err);
    res.json(order);
  });
};

exports.read_a_order = (req, res) => {
  order.find({ idorder: req.params.idorder }, (err, order) => {
    console.log("req.params.idorder", req.params.idorder);
    if (err) res.send(err);
    res.json(order);
  });
};

exports.update_a_order = (req, res) => {
  order.findOneAndUpdate(
    { _id: req.params.idorder },
    {
      trangthai: req.body.trangthai,
    },
    { new: true },
    (err, order) => {
      if (err) res.send(err);
      res.json(order);
    }
  );
};

exports.delete_a_order = (req, res) => {
  order.deleteOne({ _id: req.params.idorder }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "order successfully deleted",
      _id: req.params.idorder,
    });
  });
};
exports.getProfitMonthly = (req, res) => {
  order.aggregate(
      [
        {
          $project: {
            trangthai: 1,
            ngaytao: { $month: "$ngaytao" },
            tongtien: 1,
          },
        },
        {
          $match: {
            trangthai: "Hoàn thành",
          },
        },
        {
          $group: {
            _id: "$ngaytao",
            ngaytao: { $first: "$ngaytao" },
            tongtien: { $sum: "$tongtien" },
          },
        },
      ],
      (err, order) => {
        if (err) res.send(err);
        res.json(order);
      }
    )
    .sort({ _id: 1 });
};

exports.getProfitByDay = (req, res) =>{
  order.aggregate(
    [
      {
        $project: {
          trangthai: 1,
          month: { $month: "$ngaytao" },
          day: { $dayOfMonth: "$ngaytao" },
          tongtien: 1,
        },
      },
      {
        $match: {
          trangthai: "Hoàn thành",
        },
      },
      {
        $group: {
          _id: "$day",
          ngaytao: { $first: "$day" },
          tongtien: { $sum: "$tongtien" },
        },
      },
    ],
    (err,order) => {
      if(err) res.send(err);
      res.json(order);
    }
  )
  .sort({_id: 1});
}