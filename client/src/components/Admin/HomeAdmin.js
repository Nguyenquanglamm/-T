import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {useForm} from "react-hook-form"


const ProductsAdmin = () => {
  const [data, setData] = useState([]);
  const [dataCate, setDataCate] = useState([]);
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

  const{ handleSubmit, register} = useForm();

  console.log(data);
  const [tenSanPham, settenSanPham] = useState();
  const [categoryid, setcategoryid] = useState();
  const [soLuong, setsoLuong] = useState();
  const [donGia, setdonGia] = useState();
  const [mausac, setmausac] = useState();
  const [dungluong, setdungluong] = useState();
  const [file, setFile] = useState();
  const [reload, setReload] = useState(false);
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
    <div>
      <div className=" grid grid-cols-5 page-container w-[1200px] m-auto text-center text-l cursor-pointer ">
        <a href="" className="hover:bg-slate-600 hover:text-slate-200 rounded-md border p-2">APPLE</a>
        <a href="" className="hover:bg-slate-600 hover:text-slate-200 rounded-md border p-2">SAMSUNG</a>
        <a href="" className="hover:bg-slate-600 hover:text-slate-200 rounded-md border p-2">OPPO</a>
        <a href="" className="hover:bg-slate-600 hover:text-slate-200 rounded-md border p-2">NOKIA</a>
        <a href="" className="hover:bg-slate-600 hover:text-slate-200 rounded-md border p-2">VIVO</a>
      </div>
      <div className="  grid grid-cols-5 page-container w-[1200px] m-auto ">
        {data &&
          data.length > 0 &&
          data.map((item) => {
            return (
              <div
              key={item._id}
              className="text-black text-center border  m-4 p-2 flex flex-col  group "
              onClick={() => {
                navigate(`./product/${item._id}`);
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
                    <br />
                  </div>
                  <div className="py-2 flex items-center gap-x-2 justify-center mt-auto"></div>
                </div>
                <span className=" hidden group-hover:block text-red-600 ">{item.promotion.noidung}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductsAdmin;