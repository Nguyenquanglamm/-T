import axios from "axios";
import { converCurences } from "../../config";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useCart } from "../../context/Cartcontext";
const ProductsDetailsAdmin = () => {
  const { addToCart } = useCart();
  const [dataPro, setData] = useState();
  const { productId } = useParams();
  const [indexCap, setIndexCap] = useState(0);
  const [indexColor, setIndexColor] = useState(0);
  
  const handleAddtoCart = (dataProduct) => {
    console.log(dataProduct);
    dataProduct = {
      ...dataProduct,
      // dungLuong: dataProduct.dungLuong[indexCap],
      donGia: dataProduct.donGia[indexCap],
      mausac: dataProduct.mausac,
      hinhanh: dataProduct.hinhanh[indexColor],
      // dungLuong: dataProduct.dungLuong[indexColor],
      // khuyenmai: dataProduct.khuyenmai[indexColor],
      // tenSanPham: dataProduct.tenSanPham[indexColor],
      quantity: 1,
    };
    addToCart(dataProduct);
  };
  useEffect(() => {
    axios
      .get(`/api/productdetailss/getInfoDetails/${productId}`)
      .then((res) => {
        setData(res.data[0]);
      });
  }, [productId]);
  return (
    <div className=" w-[1200px] m-auto">
      <div className="flex page-container  items-center gap-x-5"></div>
      <div className=" page-container  w-[1200px] m-auto">
        <div>
          {dataPro && (
            <span className=" font-semibold text-4xl">
              {dataPro.productInfo.tenSanPham}
            </span>
          )}
          {/* <span className=" font-semibold text-4xl">
              {dataPro.productInfo.promotionid}
            </span> */}

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
                    src={`/images/${dataPro?.hinhanh[indexColor]}`}
                    alt=""
                    className=" justify-items-center w-[500px]  object-cover rounded-lg-50 py-11 group-hover:-translate-y-2 ease-out duration-300"
                  ></img>
                </div>
                <div className="absolute bottom-0 left-0 flex items-center h-[150px]">
                  {dataPro?.hinhanh &&
                    dataPro?.hinhanh.length > 0 &&
                    dataPro?.hinhanh.map((img) => {
                      return (
                        <div className="w-full h-full" key={uuidv4()}>
                          <img
                            src={`/images/${img}`}
                            alt=""
                            className="w-full h-full object-cover"
                          ></img>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="wrap-details">
                <div className=" mb-5 text-2xl">
                  <Dongia item={converCurences(dataPro && dataPro?.donGia[indexCap])}
                  >
                    đ
                  </Dongia>
                </div>
                <p>Lựa chọn phiên bản</p>
                <div className="flex gap-x-5  mb-5 mt-3 cursor-pointer ">
                  {dataPro.dungLuong.map((item, i) => {
                    return (
                      <DungLuong
                        item={item}
                        key={uuidv4()}
                        index={i}
                        indexCap={indexCap}
                        setIndexCap={setIndexCap}
                      ></DungLuong>
                    );
                  })}
                </div>
                <p>Lựa chọn màu</p>
                <div className="flex gap-x-5  mb-5 mt-3 cursor-pointer">
                  {dataPro.mausac.map((item, i) => {
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
                {/* <div className="flex gap-x-5  mb-5 mt-3 cursor-pointer">
                  {dataPro.productInfo.noidung.map((item, i) => {
                    return (
                      <Khuyenmai
                        item={item}
                        index={i}
                        indexColor={indexColor}
                        setIndexColor={setIndexColor}
                        key={uuidv4()}
                      ></Khuyenmai>
                    );
                  })}
                </div> */}

                <button
                  type="button"
                  className="px-4 py-2 font-semibold rounded-md border border-black text-black  hover:bg-gray-300  transition-all"
                  onClick={() => {
                    handleAddtoCart({
                      ...dataPro,
                      dungLuong: dataPro.dungLuong[indexCap],
                      mausac: dataPro.mausac[indexColor],
                    });
                  }}
                >
                  Thêm Vào Giỏ Hàng
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      
    </div>
  );
};

function Dongia({ item }) {
  return <span className="py-2 px-4 text-red-600 rounded-lg">{item} {" đ"}</span>;
}

function DungLuong({ item, index, indexCap, setIndexCap }) {
  return (
    <span
      className={`py-2 px-4 border  rounded-lg ${
        index === indexCap ? "border-yellow-400" : "border-gray-200"
      }`}
      onClick={() => {
        setIndexCap(index);
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

export default ProductsDetailsAdmin;
