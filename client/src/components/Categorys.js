import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Categorys = () => {
  const [data, setData] = useState([]);
  const { register, handleSubmit} = useForm()
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("/api/categorys").then((res) => {
      setData(res.data);
    });
  }, []);
  
  const handleFormSubmit = (data) => {
    axios.post("/api/categorys", data).then((response) => {
      console.log(response)
    });
  };
  return (
    <div className=" w-[1200px] m-auto ">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
          <input
            type="text"
            {...register("tenLoaiSanPham")}
            placeholder="Nhập Tên Loại Sản Phẩm"           
            className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
          />
          <button
            type="submit"
            className="h-10 px-6 font-semibold rounded-md bg-gray-400 text-black  hover:bg-gray-600"
          >
            Thêm  Loại Sản Phẩm
          </button>
        </form>
        <div className="grid grid-cols-1 page-container py-3 px-12 border boder-gray-300 rounded-lg  my-2 w-[100%] ">
        {data &&
          data.length > 0 &&
          data.map((item) => {
            return (
              <div
                key={item._id}
                className="text-black  border  m-4 p-2 flex flex-col  group  flex-direction "
                onClick={() => {
                  navigate(`/category/${item._id}`);
                }}
              >
                <div className="flex mt-auto ">
                  <div className="w-[810px]">
                    <span className=" text-lg font-semibold rounded-xl px-6  "> {item.tenLoaiSanPham} </span>
                  </div>
                  <div className="">
                    <button
                      className="h-10 w-[90px] mr-4 px-6 font-semibold rounded-md bg-gray-400 text-black  hover:bg-gray-600 ">
                      Sửa
                    </button>
                    <button
                      className="h-10 w-[90px]  px-6 font-semibold rounded-md bg-gray-400 text-black  hover:bg-gray-600 ">
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
export default Categorys;