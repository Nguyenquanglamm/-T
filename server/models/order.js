const mongoose = require('mongoose')
// const { v4 } = require('uuid');

const { Schema } = mongoose

const orderSchema = new Schema({    
    tenkhachhang: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        requried: true
    },
    diachi: {
        type: String,
        requried: true
    },
    sdt: {
        type: String,
        requried: true
    },
    hinhThucThanhToan: {
        type: String,
        required: "Bạn Chưa Chọn Hình Thức Thanh Toán",
      },
    tongtien: {
        type: Number,        
    },
    trangthai: {
        type: String,
        requried: true,
        default: 'Chờ xác nhận'
    },
    thongtinchitiet: {
        type: [],
        requried: true,
    },
    ngaytao: {
        type: Date,
        default: new Date(),
    }
})

module.exports = mongoose.model("order", orderSchema);