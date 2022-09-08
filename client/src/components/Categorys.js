import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Categorys = () => {
  const [data, setData] = useState([]);
  const { register, handleSubmit } = useForm();
  const [notiDele, setNotiDele] = useState(true);
  const navigate = useNavigate();
  const notify = () =>
    toast.error("Xóa thành công", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  useEffect(() => {
    axios.get("/api/categorys").then((res) => {
      setData(res.data);
    });
  }, [notiDele]);

  const handleDelete = (item) => {
    axios.delete(`/api/categorys/${item._id}`).then((res) => {
      if (res.status === 200) notify();
      setNotiDele(!notiDele);
    });
  };

  const handleFormSubmit = (data) => {
    axios.post("/api/categorys", data).then((data) => {
      console.log(data);
      if (data.status === 200) setNotiDele(!notiDele);
    });
  };


  return (
    <div className=" w-[1200px] m-auto ">
      <div className=" text-center text-3xl mt-2">Loại Sản Phẩm</div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        encType="multipart/form-data"
      >
        <input
          type="text"
          {...register("tenLoaiSanPham")}
          placeholder="Nhập Tên Loại Sản Phẩm"
          className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
        />
        <button
          type="submit"
          className="h-10 px-6 font-semibold rounded-md  bg-[#00483d] text-white  hover:bg-[#3D8361]"
        >
          Thêm Loại Sản Phẩm
        </button>
      </form>
      <div className="grid grid-cols-1 page-container py-3 px-12 border boder-gray-300 rounded-lg  my-2 w-[100%] ">
        {data &&
          data.length > 0 &&
          data.map((item) => {
            return (
              <div
                key={item._id}
                className="text-black hover:bg-slate-100 border  m-4 p-2 flex flex-col  group  flex-direction "
                
              >
                <div className="flex justify-between ">
                  <div className=" mt-4">
                    <span className=" text-lg font-semibold rounded-xl px-6  ">
                      {" "}
                      {item.tenLoaiSanPham}{" "}
                    </span>
                  </div>

                  <div className=" flex  justify-between w-[100px] text-center text-dark font-medium text-base py-5 px-2 bg-[#fff] ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="blue"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="red"
                      strokeWidth={2}
                      onClick={() => {
                        handleDelete(item);
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
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
