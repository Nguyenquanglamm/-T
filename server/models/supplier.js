const mongoose = require("mongoose");

const { Schema } = mongoose;
const supplierSchema = new Schema(
  {
    tennhacungcap: {
      type: String,
      required: "Tên Nhà Cung Cấp Không Được Để Trống",
    },
    email: {
      type: String,
    },
    sdt: {
        type: String,
    },
    diachi: {
        type: String,
     },
    
  },
  { collection: "supplier" }
);

module.exports = mongoose.model("supplier", supplierSchema);