import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Guarantees = () => {
  const [data, setData] = useState([]);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/api/guarantees").then((res) => {
      setData(res.data);
    });
  }, []);

  const handleFormSubmit = (data) => {
    axios.post("/api/guarantees", data).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className=" w-[1200px] m-auto ">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className=" grid grid-cols-3"
      >
        <input
          type="text"
          {...register("tenkhachhang")}
          placeholder="Nhập Tên Khách Hàng"
          className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
        />
        <input
          type="text"
          {...register("tenmay")}
          placeholder="Nhập Tên Máy"
          className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
        />
        <input
          type="text"
          {...register("sdt")}
          placeholder="Nhập số điện thoại của khách"
          className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
        />
        <input
          type="date"
          {...register("ngaynhan")}
          placeholder="Ngày nhận"
          className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
        />
        <input
          type="date"
          {...register("ngaytra")}
          placeholder="Ngày trả"
          className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
        />
        <button
          type="submit"
          className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2 bg-gray-400 text-black  hover:bg-gray-600"
        >
          Thêm Bảo Hành
        </button>
      </form>
      <div className="grid grid-cols-1 page-container py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2 ">
        {data &&
          data.length > 0 &&
          data.map((item) => {
            return (
              <div
                key={item._id}
                className="text-black  border  m-4 p-2 flex flex-col  group  flex-direction "
                onClick={() => {
                  navigate(`/promotion/${item._id}`);
                }}
              >
                <div className="">
                    <div className=" grid grid-cols-5">
                    <ul>{item.tenkhachhang}</ul>
                    <ul>{item.tenmay}</ul>
                    <ul>{item.sdt}</ul>
                    <ul>{item.ngaynhan}</ul>
                    <ul>{item.ngaytra}</ul>
                    </div>
                </div>
                <div className=" grid grid-cols-2 mt-auto ">
                  <div className=" flex ">
                    <button
                      type=""
                      className="h-10 w-[90px] mr-4  px-6 font-semibold rounded-md bg-gray-400 text-black  hover:bg-gray-600 "
                    >
                      Sửa
                    </button>
                    <button className="h-10 w-[90px]  px-6 font-semibold rounded-md bg-gray-400 text-black  hover:bg-gray-600 ">
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Guarantees;
