import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Promotion = () => {
  const [data, setData] = useState([]);
  const { register, handleSubmit} = useForm()
  const navigate = useNavigate();
  const [notiDele, setNotiDele] = useState(true);
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
    axios.get("/api/promotions").then((res) => {
      setData(res.data);
    });
  }, [notiDele]);
  
  const handleFormSubmit = (data) => {
    axios.post("/api/promotions", data).then((response) => {
      console.log(data)
      if(data.status===200)setNotiDele(!notiDele);
    });
  };
  
  const handleDelete =(item)=>{
    console.log(item._id)
    axios.delete(`/api/promotions/${item._id}`).then((res) =>{
      if(res.status === 200)notify();
      setNotiDele(!notiDele);
    })
  }

  return (
    <div className=" w-[1200px] m-auto ">
      <div className=" text-center text-3xl mt-2">Khuyến mại</div>
      <form onSubmit={handleSubmit(handleFormSubmit)} encType="multipart/form-data">
          <input
            type="text"
            {...register("tenkhuyenmai")}
            placeholder="Nhập Tên Khuyến Mại"           
            className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
          />
          <input
            type="text"
            {...register("noidung")}
            placeholder="Nhập Nội Dung"           
            className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
          />
          <button
            type="submit"
            className="h-10 px-6 font-semibold rounded-md  bg-gray-400 text-black  hover:bg-gray-600"
          >
            Thêm Khuyến Mại
          </button>
        </form>
        <div className="grid grid-cols-1 page-container py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2 ">
        {data &&
          data.length > 0 &&
          data.map((item) => {
            return (
              <div
                key={item._id}
                className="text-black hover:bg-gray-200 border  m-2 p-2 flex flex-col  group  flex-direction "
                // onClick={() => {
                //   navigate(`/promotion/${item._id}`);
                // }}
              >
                <div className="flex justify-between ">
                  <div>
                    <span className=" text-lg font-semibold rounded-xl px-6  "> {item.tenkhuyenmai} </span>
                  </div>
                  <div className="">
                    <span className=" text-lg font-semibold rounded-xl px-6  "> {item.noidung} </span>
                  </div>
                  <div className=" justify-between w-20 flex">
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
export default Promotion;