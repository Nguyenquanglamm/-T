const mongoose = require("mongoose");
const productdetails = mongoose.model("productdetails");
const multer = require("multer");
const path = require("path");

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

exports.list_all_productdetailss = (req, res) => {
  productdetails.find({}, (err, productdetailss) => {
    if (err) res.send(err);
    res.json(productdetailss);
  });
};

// exports.create_a_productdetails = (req, res) => {
//   console.log(req.file);
//   const newproductdetails = new productdetails(req.body);
//   newproductdetails.save((err, productdetails) => {
//     if (err) res.send(err);
//     res.json(productdetails);  
//   });
// };

exports.create_a_productdetails = (req, res) => {
  console.log(req.body);
  const newproductdetails = new productdetails({
    idSanPham: req.body.idSanPham,
    hinhanh: req.file.filename,
    donGia: req.body.donGia,
    donGiaCu: req.body.donGiaCu,
    dungluong: req.body.dungluong,
    mausac: req.body.mausac,
    soLuong: req.body.soLuong,

  });
  newproductdetails.save((err, productdetails) => {
    if (err) res.send(err);
    res.json(productdetails);  
  });
};

exports.read_a_productdetails = (req, res) => {
  productdetails.findById(req.params.productdetailsId, (err, productdetails) => {
    console.log("req.params.productdetailsId", req.params.productdetailsId);
    if (err) res.send(err);
    res.json(productdetails);
  });
};

exports.update_a_productdetails = (req, res) => {
  productdetails.findByIdAndUpdate(
    { _id: req.params.productdetailsId },
    { $set: req.body },
    { new: true },
    (err, productdetails) => {
      if (err) res.send(err);
      res.json(productdetails);
    }
  );
};

exports.delete_a_productdetails = (req, res) => {
  productdetails.deleteOne({ _id: req.params.productdetailsId }, (err) => {
    if (err) res.send(err);
    res.json({
      message: "productdetails successfully deleted",
      _id: req.params.productdetailsId,
    });
  });
};

exports.UpdateQuantity = (req, res) =>{
  console.log(req.params)
  productdetails.updateOne({
    productdetailsId : new mongoose.Types.ObjectId(req.params.infoId),
    mausac : req.params.mausac,
    dungluong : req.params.dungluong,
  },
  {
    $inc:{ soLuong: -req.params.quantity}
  },
  (err,proInfo)=>{
    if (err) res.send(err);
    console.log(proInfo);
    res.json(proInfo);
  }
  );
};

exports.getAllProductDetails =  (req,res) => {
  productdetails.aggregate([
    
    {
      $group:{
        _id:"$idSanPham",
        mausac:{$addToSet:"$mausac"},
        dungluong:{$addToSet:"$dungluong"},
        donGia:{$addToSet:"$donGia"},
        donGiaCu:{$addToSet:"$donGiaCu"},
        soLuong:{$sum: "$soLuong"}
      }
    },
    {
      $lookup :{
        from:"product",
        localField:"_id",
        foreignField:"_id",
        as: "product"
      }
    },
    {$unwind :"$product"}
  ],(err, productdetails)=> {
    if(err) res.send(err);
    res.json(productdetails); 
  })
}
exports.getProductDetails =  (req,res) => {
  productdetails.aggregate([
    {
      $match: {
        idSanPham: mongoose.Types.ObjectId(req.params.idSanPham),},
    },
    {
      $lookup :{
        from:"product",
        localField:"idSanPham",
        foreignField:"_id",
        as: "product"
      }
    },
    {$unwind :"$product"}
  ],(err, productdetails)=> {
    if(err) res.send(err);
    res.json(productdetails); 
  })
}

exports.getInfoPro = (req,res) => {
  productdetails.aggregate([
    {
      $match : {
        idSanPham : mongoose.Types.ObjectId(req.params.productdetailsId)
      }
    },
    {
      $group : {
        _id: "$idSanPham",
        hinhanh : {$push : "$hinhanh"},
        donGia: {$addToSet :"$donGia"},
        donGiaCu: {$addToSet :"$donGiaCu"},
        dungLuong:{$addToSet :"$dungluong"},
        mausac:{$addToSet:"$mausac"},
      }
    },
    {
      $lookup :{
        from:"product",
        localField:"_id",
        foreignField:"_id",
        as: "productInfo"
      }
    },
    {$unwind :"$productInfo"}

  ],(err, productdetailss) => {
    if (err) res.send(err);
    res.json(productdetailss);
  }).sort({donGia : 1})
}

exports.checkProductDetails = (req,res) => {
  console.log(req.params)
  productdetails.aggregate([
    {
      $project:{
        idSanPham:1,
        mausac:1,
        dungluong:1,
      }
    },
    {
      $match: {
        idSanPham: mongoose.Types.ObjectId(req.params.proID),
        mausac:req.params.mausac,
        dungluong:req.params.dungluong
      }
    }
  ],(err,result)=> {
    if(err) res.send(err)
    res.json(result)
  })
}