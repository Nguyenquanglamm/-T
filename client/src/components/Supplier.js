import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const Supplier = () => {
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
    const [data, setData] = useState([]);
    const { register, handleSubmit } = useForm();
  const [notiDele, setNotiDele] = useState(true);
    useEffect(() => {
        axios.get("/api/supplier").then((res) => {
          setData(res.data);
        });
      }, [notiDele]);
    const handleFormSubmit = (data) => {
        axios.post("/api/supplier", data).then((response) => {
          console.log(response);
          if (data.status === 200) setNotiDele(!notiDele);
        });
      };
      const handleDelete = (item) => {
        console.log(item._id);
        axios.delete(`/api/supplier/${item._id}`).then((res) => {
          if (res.status === 200) notify();
          setNotiDele(!notiDele);
        });
      };
    return (
        <div className=" w-[1200px] m-auto ">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        encType="multipart/form-data"
        className=" grid grid-cols-3"
      >
        <input
          type="text"
          {...register("tennhacungcap")}
          placeholder="Nhập tên nhà cung cấp"
          className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
        />
        <input
          type="text"
          {...register("email")}
          placeholder="Email nhà cung cấp"
          className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
        />
        <input
          type="tel"
          {...register("sdt")}
          placeholder="Nhập số điện thoại của nhà cung cấp"
          className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
        />
        <input
          type="text"
          {...register("diachi")}
          placeholder="Nhập địa chỉ nhà cung cấp"
          className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
        />
        <button
          type="submit"
          className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2  bg-[#00483d] text-white  hover:bg-[#3D8361]"
        >
          Thêm Nhà Cung Cấp
        </button>
        </form>
        <div className="">
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          rel="stylesheet"
          href="https://cdn.tailgrids.com/tailgrids-fallback.css"
        />
        <script
          defer
          src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"
        ></script>

        <section className="bg-white py-20 lg:py-[10px]">
          <div className="container">
            <div className=" flex justify-between w-[97%] m-auto">
              <div className=" text-center text-3xl mt-2">
                Danh Sách Bảo Hành
              </div>
              <form action="" className="relative mb-2">
                <input
                  type="search"
                  className=" text-black peer cursor-pointer relative z-10 h-12 w-12 rounded-full border border-gray-800 bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-gray-800 focus:pl-16 focus:pr-4"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-800 px-3.5 peer-focus:border-gray-800 peer-focus:stroke-gray-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </form>
            </div>
            <div className="container">
              <div className=" ">
                <div className="w-full ">
                  <div className="max-w-full overflow-x-auto overflow">
                    <table className="table-auto  w-full">
                      <thead>
                        <tr className="bg-[#00483d] text-center">
                          <th className="  text-lg font-semibold text-white py-4   ">
                            Tên nhà cung cấp
                          </th>
                          <th className="  text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 ">
                            Email
                          </th>
                          <th className="  text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 ">
                            Số điện thoại
                          </th>
                          <th className="  text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4  ">
                            Địa chỉ
                          </th>
                          <th className="  text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4  "></th>
                        </tr>
                      </thead>
                      <tbody>
                        {data &&
                          data.length > 0 &&
                          data.map((item) => {
                            return (
                              <tr className=" " key={item._id}>
                                <td className=" text-center text-dark font-medium text-base py-5 px-2 bg-[#fff] border  border-[#494040]   ">
                                  {item.tennhacungcap}
                                </td>
                                <td className="  text-center text-dark font-medium text-base py-5 px-2 bg-[#fff] border  border-[#494040]    ">
                                  {item.email}
                                </td>
                                <td className="  text-center text-dark font-medium text-base py-5 px-2 bg-[#fff] border  border-[#494040]    ">
                                  {item.sdt}
                                </td>
                                <td className="  text-center text-dark font-medium text-base py-5 px-2 bg-[#fff] border  border-[#494040]    ">
                                  {item.diachi}
                                </td>
                                <td className=" flex justify-between text-center text-dark font-medium text-base py-5 px-2 bg-[#fff] border  border-[#494040]    ">
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
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
        </div>
    );
};

export default Supplier;