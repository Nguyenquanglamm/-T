const mongoose = require("mongoose");

const { Schema } = mongoose;
const promotionSchema = new Schema(
  {
    tenkhuyenmai: {
      type: String,
      required: "Tên Khuyến Mại Không Được Để Trống",
    },
    noidung: {
        type: String,
        required: "Nội Dung Không Được Để Trống"
    },
    
  },
  { collection: "promotion" }
);

module.exports = mongoose.model("promotion", promotionSchema);