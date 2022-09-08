const mongoose = require("mongoose");

const { Schema } = mongoose;
const guaranteeSchema = new Schema(
  {
    tenkhachhang: {
      type: String,
      required: "Tên khách hàng Không Được Để Trống",
    },
    tenmay: {
        type: String,
        required: "Tên khách hàng Không Được Để Trống",
    },
    sdt: {
        type :String,
        required: "Không để được để trống"
    },
    ngaynhan: {
        type: Date,
        required: "Tên khách hàng Không Được Để Trống",
    },
    ngaytra: {
        type: Date,
        required: "Tên khách hàng Không Được Để Trống",
    },  
    
  },
  { collection: "guarantee" }
);

module.exports = mongoose.model("guarantee", guaranteeSchema);