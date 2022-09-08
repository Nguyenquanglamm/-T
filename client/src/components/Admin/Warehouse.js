import React, { useEffect, useState } from "react";
import axios from "axios";
import { converCurences } from "../../config";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const Warehouse = () => {
  const [data, setData] = useState();
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
    axios.get(`/api/productdetailss/details`).then((res) => {
      setData(res.data);
    });
  }, []);
  const handleDelete = (item) => {
    console.log(item._id);
    axios.delete(`/api/products/${item._id}`).then((res) => {
      // if (res.status === 200) notify();
      // setNotiDele(!notiDele);
      console.log(res);
    });
  };
  return (
    <div>
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
              <div className=" text-center text-3xl mt-2">Kho Hàng</div>
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
            <div className=" ml-4 mb-3 my-auto  z-0">
              <div className="w-full px-4">
                <div className="max-w-full overflow-x-auto overflow">
                  <table className="table-auto  w-full">
                    <thead>
                      <tr className="bg-[#3D8361]  text-center">
                        <th className=" border text-lg font-semibold text-white py-4   ">
                          Tên sản phẩm
                        </th>

                        <th className=" border text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 ">
                          Số lượng
                        </th>
                        <th className=" border text-lg font-semibold text-white py-4 lg:py-7 px-3 lg:px-4 "></th>
                      </tr>
                    </thead>
                    {data && data.length > 0 && (
                      <tbody>
                        {data.map((item) => {
                          return (
                            <tr
                              className="border-gray-300 hover:bg-gray-200 border text-center "
                              key={uuidv4()}
                            >
                              <th className=" border text-lg font-semibold text-black py-4   ">
                                {item.product.tenSanPham}
                              </th>

                              <th className=" border text-lg font-semibold text-black py-4 lg:py-7 px-3 lg:px-4 ">
                                {item.soLuong}
                              </th>

                              <th>
                                <div className=" flex  justify-between   text-dark font-medium text-base py-8 px-2 ">
                                 
                                  
                                    <svg
                                    type="button"
                                    onClick={() => {
                                      navigate(
                                        `/admin/warehousedetail/${item._id}`
                                      );
                                    }}
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6 cursor-pointer"
                                      fill="none"
                                      viewBox="0 0 20 24"
                                      stroke="currentColor"
                                      strokeWidth={2}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
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
                              </th>
                            </tr>
                          );
                        })}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Warehouse;
