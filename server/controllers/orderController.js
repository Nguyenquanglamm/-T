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
  order
    .aggregate(
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

exports.getProfitByDay = (req, res) => {
  order
    .aggregate(
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
      (err, order) => {
        if (err) res.send(err);
        res.json(order);
      }
    )
    .sort({ _id: 1 });
};

exports.getOrderByDateRange = (req, res) => {
  console.log(req.params);
  order
    .aggregate(
      [
        {
          $project: {
            trangthai: 1,
            ngaytao: 1,
            // day: { $dayOfMonth: "$updatedAt" },
            // month: { $month: "$updatedAt" },
            // year: { $year: "$updatedAt" },
            tongtien: 1,
          },
        },
        {
          $match: {
            trangthai: "Hoàn thành",
            ngaytao: {
              $gte: new Date(req.params.startDate),
              $lte: new Date(req.params.endDate),
            },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%d/%m/%Y", date: "$ngaytao" } },
            tongtien: { $sum: "$tongtien" },
            count: { $sum: 1 },
            ngaytao: { $first: "$ngaytao" },
          },
        },
        {
          $project: {
            tongtien: 1,
            count: 1,
            ngaytao: 1,
          },
        },
      ],
      (err, orders) => {
        if (err) res.send(err);
        res.json(orders);
      }
    )
    .sort({ ngayDat: 1 });
};

exports.getPriceByTime = (req, res) => {
  // console.log(req.params);
  // [{}];
  console.log(req.params.id);
  order.aggregate(
    [
      {
        $addFields: {
          _newID: { $first: "$thongtinchitiet._id" },
          ttct: "$thongtinchitiet",
        },
      },
      { $unwind: "$ttct" },
      {
        $project: {
          _id: 1,
          ttct: 1,
          _newID: 1,
          trangthai: 1,
          ngaytao: 1,
        },
      },

      // //   //   // giống where trong sql
      {
        $match: {
          trangthai:"Hoàn thành",
          _newID: req.params.id,
          // _id: req.params.id,
          // ram: req.params.ram,
        },
      },
      // {

      // },
      {
        $group: {
          _id: {
            ID: "$_newID",
            dungLuong: "$ttct.dungLuong",
          },
          price: { $push: "$ttct.donGia" },
          dungLuong: { $first: "$ttct.dungLuong" },
        },
      },
      // { $sort: { _id.day: -1, month: -1 } },

      { $sort: { ram: 1 } },
    ],
    (err, order) => {
      if (err) res.send(err);
      res.json(order);
    }
  );
};
