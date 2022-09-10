const mongoose = require("mongoose");

const { Schema } = mongoose;
const productdetailsSchema = new Schema(
  {
    idSanPham: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: "product1 cannot be blank",
    },
    mausac: {
      type: String,
    },
    dungluong: {
      type: String,
    },
    donGia: {
      type: Number,
      required: "Giá Sản Phẩm Không Được Để Trống",
    },
    donGiaKhuyenMai: {
      type: Number,
      required: "Giá Khuyến Mại Sản Phẩm Không Được Để Trống",
    },
    soLuong: {
      type: Number,
      required: "Số Lượng Sản Phẩm Không Được Để Trống",
    },
    hinhanh: {
      type: String,
    },
  },
  { collection: "productdetails" }
);

module.exports = mongoose.model("productdetails", productdetailsSchema);
