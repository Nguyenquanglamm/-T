const mongoose = require("mongoose");
const product = mongoose.model("product");
const multer = require("multer");
const path = require("path");
const _ = require("lodash");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      "images" +
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

exports.uploadImage = upload.single("hinhanh");

exports.list_all_products = (req, res) => {
  product.find({}, (err, products) => {
    if (err) res.send(err);
    res.json(products);
  });
};

exports.getAllProducts = (req, res) => {
  product.aggregate(
    [
      {
        $lookup: {
          from: "promotion",
          localField: "promotionid",
          foreignField: "_id",
          as: "promotion",
        },
      },
      { $unwind: "$promotion" },
    ],
    (err, product) => {
      if (err) res.send(err);
      res.json(product);
    }
  );
};

exports.getAllCategorys = (req, res) => {
  product.aggregate(
    [
      {
        $lookup: {
          from: "category",
          localField: "categoryid",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
    ],
    (err, product) => {
      if (err) res.send(err);
      res.json(product);
    }
  );
};

exports.create_a_product = (req, res) => {
  console.log(req.body);
  const newproduct = new product({
    tenSanPham: req.body.tenSanPham,
    categoryid: req.body.categoryid,
    promotionid: req.body.promotionid,
    supplierid: req.body.supplierid,
    hinhanh: req.file.filename,
    mota: req.body.mota,
  });
  newproduct.save((err, product) => {
    if (err) res.send(err);
    res.json(product);
  });
};

exports.read_a_product = (req, res) => {
  product.findById(req.params.productId, (err, product) => {
    console.log("req.params.productId", req.params.productId);
    if (err) res.send(err);
    res.json(product);
  });
};

// exports.update_a_product = (req, res) => {
//   product.findOneAndUpdate(
//     { _id: req.params.productId },
//     { $set: req.body },
//     { new: true },
//     (err, product) => {
//       if (err) res.send(err);
//       res.json(product);
//     }
//   );
// };

exports.delete_a_product = (req, res) => {
  product.deleteOne({ _id: req.params.productId }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "product successfully deleted",
      _id: req.params.productId,
    });
  });
};

exports.findProductByQuery = (req, res) => {
  const findname = req.params.query;
  product.find(
    { tenSanPham: { $regex: ".*" + findname + ".*", $options: "$gi" } },
    (err, products) => {
      if (err) res.send(err);
      res.json(products);
    }
  );
};

exports.update_a_product = (req, res) => {
  console.log("body update", req.body);
  if (req.file) {
    product.findOneAndUpdate(
      { _id: req.params.productId },
      {
        tenSanPham: req.body.tenSanPham,
        categoryid: req.body.categoryid,
        promotionid: req.body.promotionid,
        hinhanh: req.file.filename,
        supplierid: req.body.supplierid,
      },
      { new: true },
      (err, products) => {
        if (err) res.send(err);
        res.json(products);
      }
    );
  } else {
    product.findOneAndUpdate(
      { _id: req.params.productId },
      {
        tenSanPham: req.body.tenSanPham,
        promotionid: req.body.promotionid,
        categoryid: req.body.categoryid,
        supplierid: req.body.supplierid,
      },
      { new: true },
      (err, products) => {
        if (err) res.send(err);
        res.json(products);
      }
    );
  }
};
exports.filterProduct = (req, res) => {
  console.log(req.query);
  if (_.isEmpty(req.query)) {
    product.find({}, (err, products) => {
      if (err) res.send(err);
      res.json(products);
    });
  } else {
    product.aggregate(
      [
        {
          $match: {
            tenSanPham: {
              $regex: ".*" + req.query.name + ".*",
              $options: "$gi",
            },
          },
        },
        {
          $lookup: {
            from: "promotion",
            localField: "promotionid",
            foreignField: "_id",
            as: "promotion",
          },
        },
        {
          $unwind: "$promotion",
        },
      ],
      (err, product) => {
        if (err) res.send(err);
        res.json(product);
      }
    );
  }
};

exports.getProInfo = (req, res) => {
  product.aggregate(
    [
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.productdetailsId),
        },
      },
      {
        $lookup: {
          from: "productdetails",
          localField: "_id",
          foreignField: "idSanPham",
          as: "proInfo",
        },
      },
      {
        $unwind: "$proInfo",
      },
      {
        $group: {
          // _id: "$idSanPham",
          _id: {
            ID: "$_id",
            // mausac: "$proInfo.mausac",
            dungluong: "$proInfo.dungluong",
          },
          donGia: { $first: "$proInfo.donGia" },
          donGiaCu: { $first: "$proInfo.donGiaCu" },
          hinhanh: { $push: "$hinhanh" },
          mausac: { $push: "$proInfo.mausac" },
          soLuong: { $first: "$proInfo.soLuong" },
          tenSanPham: {$first:"$tenSanPham"}
        },
      },
      // { $unwind: "$mausac" },
      {
        $lookup: {
          from: "productdetails",
          localField: "_id.ID",
          foreignField: "idSanPham",
          as: "proInfo",
        },
      },
      // {
      //   $group: {
      //     _id: "$_id",
      //     hinhanh: { $first: "$hinhanh" },
      //     option: { $push: "$option" },
      //     prosInfo: { $first: "$productInfo" },
      //   },
      // },
    ],
    (err, product) => {
      if (err) res.send(err);
      res.json(product);
    }
  ).sort({'_id.dungluong':-1})
};
