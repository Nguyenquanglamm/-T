const mongoose = require("mongoose");

const { Schema } = mongoose;
const productSchema = new Schema(
  {
    tenSanPham: {
      type: String,
      required: "Tên Sản Phẩm Không Được Để Trống",
    },
    categoryid: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: "Không để trống",
    },
    promotionid: {
      type: Schema.Types.ObjectId,
      ref: "promotion",
      required: "Không để trống",
    },
    hinhanh: {
      type: String,
      require:"k"
    },
    mota: {
      type: String,
    },
    
  },
  { collection: "product" }
);

module.exports = mongoose.model("product", productSchema);