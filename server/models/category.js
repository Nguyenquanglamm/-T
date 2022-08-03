const mongoose = require("mongoose");

const { Schema } = mongoose;
const categorySchema = new Schema(
  {
    tenLoaiSanPham: {
      type: String,
      required: "Tên Loại Sản Phẩm Không Được Để Trống",
    },
    
  },
  { collection: "category" }
);

module.exports = mongoose.model("category", categorySchema);