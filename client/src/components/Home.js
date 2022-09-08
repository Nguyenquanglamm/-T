import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

const Products = () => {
  const [data, setData] = useState([]);
  const [dataDetai, setDataDetai] = useState([]);
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
  

  const { handleSubmit, register } = useForm();

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
  };

  const handleSetFile = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div className="page-container  w-[1200px] m-auto">
      <div className=" grid grid-cols-5 page-container w-[1200px] m-auto text-center text-l cursor-pointer ">
        <a
          href=""
          className="hover:bg-slate-600 hover:text-slate-200 rounded-md shadow-md border p-2"
        >
          APPLE
        </a>
        <a
          href=""
          className="hover:bg-slate-600 hover:text-slate-200 rounded-md shadow-md border p-2"
        >
          SAMSUNG
        </a>
        <a
          href=""
          className="hover:bg-slate-600 hover:text-slate-200 rounded-md shadow-md border p-2"
        >
          OPPO
        </a>
        <a
          href=""
          className="hover:bg-slate-600 hover:text-slate-200 rounded-md shadow-md border p-2"
        >
          NOKIA
        </a>
        <a
          href=""
          className="hover:bg-slate-600 hover:text-slate-200 rounded-md shadow-md border p-2"
        >
          VIVO
        </a>
      </div>
      <img
        className=" mt-5 rounded-xl shadow-md"
        src="https://cdn.hoanghamobile.com/i/home/Uploads/2022/09/08/dang-ki-iphone-14wee.png"
      ></img>
      <div className="  grid grid-cols-5 page-container w-[1200px] m-auto ">
        {data &&
          data.length > 0 &&
          data.map((item) => {
            return (
              <div
                key={item._id}
                className="text-black text-center rounded-xl shadow-md border  m-4 p-2 flex flex-col group "
                onClick={() => {
                  navigate(`/product/${item._id}`);
                }}
              >
                <div className="">
                  <img
                    src={`./images/${item.hinhanh}`}
                    alt=""
                    className=" justify-items-center w-700 object-cover rounded-lg-50  group-hover:-translate-y-2 ease-out duration-300"
                  ></img>
                </div>
                <div className="flex flex-col mt-auto">
                  <div>
                    <span> {item.tenSanPham} </span>
                    <span> {item.donGia} </span>
                    <br />
                    <br />
                  </div>
                  <div className=" flex items-center gap-x-2 justify-center mt-auto"></div>
                </div>
                <span className=" hidden relative group-hover:block text-red-600 ">
                  {item.promotion.noidung}
                </span>
              </div>
            );
          })}
      </div>
      <div className="flex gap-x-16 justify-center page-container text-black py-4 page-container">
        <ul></ul>
        <ul></ul>
        <ul></ul>
        <ul></ul>
      </div>
    </div>
  );
};

export default Products;
