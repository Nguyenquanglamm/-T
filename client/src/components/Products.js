import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext  } from "react-router-dom";

import {useForm} from "react-hook-form"

const Products = () => {

  const [data, setData] = useState([]);
  const [dataCate, setDataCate] = useState([]);
  const [dataPromotion, setDataPromotion] = useState([]);
  const [tenSanPham, settenSanPham] = useState();
  const [categoryid, setcategoryid] = useState();
  const [soLuong, setsoLuong] = useState();
  const [donGia, setdonGia] = useState();
  const [mausac, setmausac] = useState();
  const [dungluong, setdungluong] = useState();
  const [file, setFile] = useState();
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/api/products").then((res) => {
      setData(res.data);
    });
    
  }, []);
  // Lấy dữ liệu từ collection categorys
  useEffect(() => {
    axios.get("/api/categorys").then((res) => {
      setDataCate(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/promotions").then((res) => {
      setDataPromotion(res.data);
    });
    
  }, []);

  const{ handleSubmit, register} = useForm();

  
  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("tenSanPham", tenSanPham);
  //   formData.append("categoryid", categoryid);
  //   formData.append("soLuong", soLuong);
  //   formData.append("donGia", donGia);
  //   formData.append("mausac", mausac);
  //   formData.append("dungluong", dungluong);
  //   formData.append("hinhanh", file);
  //   axios.post("/api/products", formData).then((response) => {
  //     console.log(response)
  //   });
  // };
  const handleOnSubmit = (data) => {
    const formData = new FormData();
    formData.append("tenSanPham", tenSanPham);
    formData.append("categoryid", data.categoryid);
    formData.append("promotionid", data.promotionid);
    formData.append("soLuong", soLuong);
    formData.append("donGia", donGia);
    formData.append("mausac", mausac);
    formData.append("dungluong", dungluong);
    formData.append("hinhanh", file);
    axios.post("/api/products", formData).then((data) => {
      console.log(data);
    });
  }

  const handleSetFile = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div className=" w-[1200px] m-auto">
      <div className="flex page-container  items-center gap-x-5">
        
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)} encType="multipart/form-data">
        <input
          type="text"
          name="tenSanPham"
          placeholder="Nhập Tên Sản Phẩm"
          onChange={(e) => {
            settenSanPham(e.target.value);
          }}
          className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
        />

        <select id="categoryid" {...register("categoryid")} className="py-3 px-12 border border-gray-300 rounded-lg mx-2 my-2">
          <option value="" >Loại sản phẩm</option>
          {dataCate &&
            dataCate.length > 0 &&
            dataCate.map((item) => {
              return (
                <option value={item._id} key={item._id}>
                  {item.tenLoaiSanPham}
                </option>
              );
            })}
        </select>

        <select id="promotionid" {...register("promotionid")} className="py-3 px-12 border border-gray-300 rounded-lg mx-2 my-2">
          <option value="" >Khuyến mại</option>
          {dataPromotion &&
            dataPromotion.length > 0 &&
            dataPromotion.map((item) => {
              return (
                <option value={item._id} key={item._id}>
                  {item.noidung}
                </option>
              );
            })}
        </select>
        
        
        
        <input type="file" name="hinhanh" onChange={handleSetFile} />
        <button
          type="submit"
          className="bg-gray-400 text-black  hover:bg-gray-600  px-3 py-2 text-base font-medium"
        >
          Thêm Sản Phẩm
        </button>
      </form>
      <div className="  grid grid-cols-5 page-container w-[1200px]   ">
        {data &&
          data.length > 0 &&
          data.map((item) => {
            return (
              <div
                key={item._id}
                className="text-black text-center border  m-4 p-2 flex flex-col  group "
                onClick={() => {
                  navigate(`/product/${item._id}`);
                }}
              >
                <div>
                  <img
                    src={`../images/${item.hinhanh}`}
                    alt=""
                    className=" justify-items-center w-700 object-cover rounded-lg-50 py-11 group-hover:-translate-y-2 ease-out duration-300"
                  ></img>
                </div>
                <div className="flex flex-col mt-auto">
                  <div>
                    <span> {item.tenSanPham} </span>
                    <span> {item.promotion.noidung} </span>
                    <br />
                  </div>
                  <div className="py-2 flex items-center gap-x-2 justify-center mt-auto"></div>
                </div>
              </div>
            );
          })}
          
      </div>
    </div>
  );
};

export default Products;
