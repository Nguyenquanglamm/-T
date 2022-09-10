import React, { useState, useEffect } from "react";
import axios from "axios";
import { converCurences, formatDate } from "../../config";

const Orderlist = () => {
  const [dataOrder, setDataOrder] = useState();
  useEffect(() => {
    axios.get("/api/order").then((res) => {
      setDataOrder(res.data);
    });
  }, []);

  const handleUpdateStateOrder = (id, state) => {
    axios.put(`/api/order/${id}`, { trangthai: state }).then((res) => {
      // console.log(res);
    });
  };

  const handleUpdateQuantity = (e, item) => {
    console.log(e.target.value);
    if (e.target.value === "Hoàn thành") {
      item.thongtinchitiet.forEach((el) => {
        axios.put(`/api/productdetailss/updateQuantity/infoId=${el.productInfo._id}&mausac=${el.mausac}&dungluong=${el.dungLuong}&quantity=${el.quantity}`
        );
      });
    }
    if(e.target.value === "Hủy"){
      item.thongtinchitiet.forEach((el) => {
        axios.put(`/api/productdetailss/updateQuantity/infoId=${el.productInfo._id}&mausac=${el.mausac}&dungluong=${el.dungLuong}&quantity=${-el.quantity}`
        );
      });
    }
  };

  return (
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
        <div className=" container">
        <div className=" flex justify-between w-[97%] m-auto">
              <div className=" text-center text-3xl mt-2">Đơn Hàng</div>
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
                    <tr className="bg-[#3D8361]  text-center">
                      <th
                        className="
                           w-1/6
                           min-w-[90px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-l border-transparent
                           "
                      >
                        Tên khách hàng
                      </th>
                      {/* <th
                        className="
                           w-1/8
                           min-w-[90px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                      >
                        Email
                      </th> */}
                      <th
                        className="
                           w-1/8
                           min-w-[115px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                      >
                        Địa chỉ
                      </th>
                      <th
                        className="
                           w-1/8
                           min-w-[115px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                      >
                        Số điện thoại
                      </th>
                      <th
                        className="
                           w-1/8
                           min-w-[115px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                      >
                        Thông tin chi tiết
                      </th>
                      <th
                        className="
                           w-1/8
                           min-w-[115px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           "
                      >
                        Hình thức thanh toán
                      </th>
                      <th
                        className="
                           w-1/8
                           min-w-[125px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-r border-transparent
                           "
                      >
                        Tổng tiền
                      </th>

                      <th
                        className="
                           w-1/10
                           min-w-[90px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-r border-transparent
                           "
                      >
                        Ngày Tạo
                      </th>
                      <th
                        className="
                           w-1/8
                           min-w-[115px]
                           text-lg
                           font-semibold
                           text-white
                           py-4
                           lg:py-7
                           px-3
                           lg:px-4
                           border-r border-transparent
                           "
                      >
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataOrder &&
                      dataOrder.length > 0 &&
                      dataOrder.map((item) => {
                        return (
                          <tr key={item.id}
                          className=" ">
                            <td
                              className=" text-center text-dark font-medium text-base py-5 px-2 bg-[#fff] border  border-[#494040]">
                              {item.tenkhachhang}
                            </td>
                            {/* <td
                              className=" 
                     text-center text-dark
                     font-medium
                     text-base
                     py-5
                     px-2
                     bg-white
                     border-b border-[#E8E8E8]
                     "
                            >
                              {item.email}
                            </td> */}
                            <td
                              className=" 
                     text-center text-dark
                     font-medium
                     text-base
                     py-5
                     px-2
                     bg-[#fff] border
                      border-[#494040]
                     "
                            >
                              {item.diachi}
                            </td>
                            <td
                              className=" 
                     text-center text-dark
                     font-medium
                     text-base
                     py-5
                     px-2
                     bg-[#fff] border
                      border-[#494040]
                     "
                            >
                              {item.sdt}
                            </td>
                            <td
                              className=" 
                     text-center 
                     text-dark
                     font-medium
                     text-base
                     py-5
                     px-2 
                     bg-[#fff] border
                     border-[#494040]
                     "
                            >
                              {item.thongtinchitiet.map((el) => {
                                return (
                                  <tr className="  border-b-2 border-t-2 hadow-inners ">
                                    Sản Phẩm: {el.productInfo.tenSanPham},{" "}
                                    {el.dungLuong}, {el.mausac}
                                    <br /> Số lượng :{el.quantity}
                                  </tr>
                                );
                              })}
                            </td>
                            <td
                              className=" 
                     text-center text-dark
                     font-medium
                     text-base
                     py-5
                     px-2
                     bg-[#fff] border
                      border-[#494040]
                     "
                            >
                              {item.hinhThucThanhToan}
                            </td>
                            <td
                              className=" 
                     text-center text-dark
                     font-medium
                     text-base
                     py-5
                     px-2
                      bg-[#fff] border
                     border-[#494040]
                     "
                            >
                              {converCurences(item.tongtien)}đ
                            </td>
                            <td
                              className=" 
                     text-center text-dark
                     font-medium
                     text-base
                     py-5
                     px-2
                      bg-[#fff] border
                     border-[#494040]
                     "
                            >
                              {formatDate(new Date(item.ngaytao))}
                            </td>
                            <th className=" bg-[#fff] border border-[#494040]">
                              <select
                                className="px-2 uppercase font-bold  text-gray-500 cursor-pointer"
                                id="personlist"
                                onChange={(e) => {
                                  handleUpdateStateOrder(
                                    item._id,
                                    e.target.value
                                  );
                                  handleUpdateQuantity(e, item);
                                }}
                              >
                                <option value="">{item.trangthai}</option>
                                <option value="Chờ xác nhận">
                                  Chờ xác nhận
                                </option>
                                <option value="Đang giao">Đang Giao</option>
                                <option value="Hoàn thành">Hoàn thành</option>
                                <option value="Hủy">Hủy</option>
                              </select>
                            </th>
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
  );
};

export default Orderlist;
