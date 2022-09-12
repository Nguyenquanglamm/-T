import axios from "axios";
import { converCurences } from "../config";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useCart } from "../context/Cartcontext";
const ProductsDetails = () => {
  const { addToCart } = useCart();
  const [dataPro, setData] = useState();
  const { productId } = useParams();
  const [indexCap, setIndexCap] = useState(0);
  const [indexColor, setIndexColor] = useState(0);
  const [color, setColor] = useState(0)
  const handleAddtoCart = (dataProduct) => {
    console.log(dataProduct._id.ID);
    dataProduct = {
      ...dataProduct,
      _id:dataProduct._id.ID
    }
    //   // dungLuong: dataProduct.dungLuong[indexCap],
    //   dongia: dataProduct[indexCap].dongia,
    //   mausac: dataProduct.mausac,
    //   hinhanh: dataProduct[indexColor].hinhanh[0],
    //   // dungLuong: dataProduct.dungLuong[indexColor],
    //   // khuyenmai: dataProduct.khuyenmai[indexColor],
    //   // tenSanPham: dataProduct.tenSanPham[indexColor],
    //   quantity: 1,
    // };
    addToCart(dataProduct);
  };
  useEffect(() => {
    axios
      // .get(`/api/productdetailss/getInfoDetails/${productId}`)
      .get(`/api/products/v1/getInfo/${productId}`)
      .then((res) => {
        setData(res.data);
        setColor(res.data[0].mausac)
      });
  }, [productId]);
  const setColorClickCap = (index) => {
    setColor(dataPro[index].mausac)
  }
  console.log(indexCap)
  return (
    <div className=" w-[1200px] m-auto">
      <div className="flex page-container  items-center gap-x-5"></div>
      <div className=" page-container  w-[1200px] m-auto">
        <div>
          {dataPro && (
            <span className=" font-semibold text-4xl">
              {dataPro[0].tenSanPham}
            </span>
          )}
          
         
          <br />
        </div>
        <div className="py-6 flex gap-x-6 ">
          {dataPro && (
            <div className=" flex">
              <div
                key={dataPro?._id}
                className="text-blue-700 text-center  m-4 p-2 group relative"
              >
                <div>
                  <img
                    src={`../images/${dataPro[indexCap].hinhanh[indexColor]}`}
                    alt=""
                    className=" justify-items-center w-[500px]  object-cover rounded-lg-50 py-11 group-hover:-translate-y-2 ease-out duration-300"
                  ></img>
                </div>
                <div className="absolute bottom-0 left-0 flex items-center h-[150px]">
                  {dataPro[indexCap]?.hinhanh &&
                    dataPro[indexCap]?.hinhanh.length > 0 &&
                    dataPro[indexCap]?.hinhanh.map((img) => {
                      return (
                        <div className="w-full h-full" key={uuidv4()}>
                          <img
                            src={`../images/${img}`}
                            alt=""
                            className="w-full h-full object-cover"
                          ></img>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="wrap-details">
                  <p>Giá của sản phẩm: </p>
                  <div className=" flex">
                    
                  <div className=" mb-5 text-2xl ">
                  <DongiaCu
                    item={converCurences(dataPro && dataPro[indexCap]?.donGiaCu)}
                  ></DongiaCu>
                </div>
                <div className=" text-red-600">
                {Math.round(
                          ((dataPro[indexCap]?.donGia - dataPro[indexCap]?.donGiaCu) /
                          dataPro[indexCap]?.donGiaCu) *
                            100
                        )}%
                </div>
                  </div>
                <div className=" flex w-[340px]">
                  
                <div className=" mb-5 text-2xl ">
                  <Dongia
                    item={converCurences(dataPro && dataPro[indexCap]?.donGia)}
                  ></Dongia>
                </div>
                
                <p>|Giá đã bao gồm 10% VAT</p>
                </div>
                <p>Lựa chọn phiên bản</p>
                <div className="flex gap-x-5  mb-5 mt-3 cursor-pointer ">
                  {dataPro.map((item, i) => {
                    return (
                      <DungLuong
                        item={item._id.dungluong}
                        key={uuidv4()}
                        index={i}
                        indexCap={indexCap}
                        setIndexCap={setIndexCap}
                        setColorClickCap={setColorClickCap}
                      ></DungLuong>
                    );
                  })}
                </div>
                <p>Lựa chọn màu</p>
                <div className="flex gap-x-5  mb-5 mt-3 cursor-pointer">
                  {color.map((item, i) => {
                    return (
                      <Mausac
                        item={item}
                        index={i}
                        indexColor={indexColor}
                        setIndexColor={setIndexColor}
                        key={uuidv4()}
                      ></Mausac>
                    );
                  })}
                </div>
                

                <button
                  type="button"
                  className="px-4 py-2 font-semibold rounded-md border  bg-[#00483d] text-white  hover:bg-[#3D8361]  transition-all"
                  onClick={() => {
                    handleAddtoCart({
                      ...dataPro[indexCap],
                      dungLuong: dataPro[indexCap]._id.dungluong,
                      mausac: dataPro[indexCap].mausac[indexColor],
                      quantity:1,
                    });
                  }}
                >
                  Thêm Vào Giỏ Hàng
                </button>
              </div>
            </div>
          )}
          <div className=" border border-gray-400 ml-10 p-4 w-[288px] ">
            <h4 className=" text-center">Thông Tin Bảo Hành</h4><br/>
            <p className=" flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>{" "}
              Bảo hành 12 tháng chính hãng
            </p>
            <div className=" flex">
            <a  href="/baohanh">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </a>
              Bao xài lỗi 1 đổi 1 trong 30 ngày với lỗi phần cứng do nhà sản
              xuất.
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Dongia({ item }) {
  return (
    <span className="py-2 px-4 text-red-600 rounded-lg">
      {item}
      {" đ"}
    </span>
  );
}

function DongiaCu({ item }) {
  return (
    <span className="py-2 px-4 text-xs text-gray-600 rounded-lg line-through ">
      {item}
      {" đ"}
    </span>
  );
}

function DungLuong({ item, index, indexCap, setIndexCap ,setColorClickCap}) {
  return (
    <span
      className={`py-2 px-4 border  rounded-lg ${
        index === indexCap ? "border-yellow-400" : "border-gray-200"
      }`}
      onClick={() => {
        setIndexCap(index);
        setColorClickCap(index)
      }}
    >
      {item}
    </span>
  );
}

function Mausac({ item, index, indexColor, setIndexColor }) {
  return (
    <span
      className={`py-2 px-4 border  rounded-lg ${
        index === indexColor ? "border-yellow-400" : "border-gray-200"
      }`}
      onClick={() => {
        setIndexColor(index);
      }}
    >
      {item}
    </span>
  );
}

function Khuyenmai({ item, index, indexColor, setIndexColor }) {
  return (
    <span
      className={`py-2 px-4 border  rounded-lg ${
        index === indexColor ? "border-yellow-400" : "border-gray-200"
      }`}
      onClick={() => {
        setIndexColor(index);
      }}
    >
      {item}
    </span>
  );
}

export default ProductsDetails;
