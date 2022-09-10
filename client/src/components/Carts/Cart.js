import React, { useRef } from "react";
import axios from "axios";
import { useCart } from "../../context/Cartcontext";
import { v4 as uuidv4 } from "uuid";
import { converCurences } from "../../config";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const {
    cartItems,
    totalPrice,
    removeToCart,
    updateQuantityIncrement,
    updateQuantityDecrement,
    handleQuantityChange,
    clearAllData,
  } = useCart();
  const { navigate } = useNavigate();
  const { register, handleSubmit } = useForm();
  const quantityRef = useRef();
  const checkMaxQuantity = (cartItems, index) =>
    cartItems[index].proInfo.find(
      (item) =>
        item.dungluong === cartItems[index].dungLuong &&
        item.mausac === cartItems[index].mausac
    ).soLuong;

  // cartItems[index].proInfo.find(
  //   (item) =>
  //     item.dungLuong === cartItems[index].dungLuong &&
  //     item.mausac === cartItems[index].mausac
  // ).quantity;
  const handleFormSubmit = (data) => {
    data = {
      ...data,
      tongtien: totalPrice(),
      thongtinchitiet: cartItems,
    };
    axios.post("/api/order", data).then((res) => {
      if (res.status === 200) {
        clearAllData();
        navigate("/");
      }
    });
  };

  return (
    <div className="page-container w-[1200px] m-auto ">
      <h1 className="text-center font-bold text-[30px] text-gray-700">
        Giỏ Hàng
      </h1>
      <div className=" flex  ">
        <div>
          {cartItems &&
            cartItems.length > 0 &&
            cartItems.map((item, index) => {
              return (
                <div className="" key={uuidv4()}>
                  <div
                    className=" flex w-[600px] m-2 h-[400px] mr-[100px] border rounded-2xl   "
                    key={uuidv4()}
                  >
                    {/* colse */}

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-9 cursor-pointer w-9 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      onClick={() => {
                        removeToCart(item._id, item.mausac, item.dungLuong);
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    {/* <div className="onClick={() => {
                          removeToCart(item._id, item.ram, item.color);
                        }}">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    </div> */}
                    <div className=" flex">
                      <img
                        src={`../images/${item.hinhanh[0]}`}
                        alt="Error"
                      ></img>
                    </div>
                    <div className="">
                      <span className="text-gray-900 text-3xl text-[20px]">
                        {item.tenSanPham}
                      </span>
                      <br />
                      <span className="text-gray-700 text-lg text-[20px]">
                        Màu Sắc :{item.mausac}
                      </span>
                      <br />
                      <span className="text-gray-700 text-lg text-[20px]">
                        Phiên Bản :{item.dungLuong}
                      </span>
                      <div className="flex ">
                        <p className="text-red-500  font-bold ">
                          {converCurences(item.donGia)} đ
                        </p>
                      </div>
                      <div className="flex">
                        Số Lượng:{" "}
                        <div className=" flex border ml-3 h-10">
                          <button
                            type="button"
                            aria-label="Decrement value"
                            className="w-[25px] flex items-center justify-center"
                            onClick={() =>
                              updateQuantityDecrement(index, cartItems)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-3 h-3 "
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          <input
                            defaultValue={item.quantity}
                            // data-value={quantity}
                            ref={quantityRef}
                            onBlur={(e) => {
                              const maxq = checkMaxQuantity(cartItems, index);
                              if (+e.target.value >= maxq) {
                                e.target.value = maxq;
                                handleQuantityChange(
                                  index,
                                  cartItems,
                                  e.target.value
                                );
                              } else {
                                handleQuantityChange(
                                  index,
                                  cartItems,
                                  e.target.value
                                );
                              }
                            }}
                            // onChange={(e) => {
                            //   const maxq = checkMaxQuantity(cartItems, index);
                            //   if (+e.target.value >= maxq) {
                            //     handleQuantityChange(
                            //       index,
                            //       cartItems,
                            //       e.target.value,
                            //       maxq
                            //     );
                            //   } else {
                            //     handleQuantityChange(
                            //       index,
                            //       cartItems,
                            //       e.target.value
                            //     );
                            //   }
                            // }}
                            className="w-[25px] outline-none border-none h-full text-center"
                          ></input>
                          <button
                            aria-label="Increment value"
                            type="button"
                            className="w-[25px] flex items-center justify-center"
                            onClick={(e) => {
                              const maxq = checkMaxQuantity(cartItems, index);
                              console.log(quantityRef.current.value);
                              if (+quantityRef.current.value >= maxq) {
                                quantityRef.current.value = maxq;
                              } else {
                                updateQuantityIncrement(index, cartItems);
                              }
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4 "
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          <div className="flex  justify-between  text-[20px] w-[500px]  ">
            Tổng Tiền:
            <div className="text-red-500 px-10 font-bold ">
              {converCurences(totalPrice())}đ
            </div>
          </div>
        </div>
        <div>
          <div className="  w-[500px] group   ">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div>
                <ul className=" font-bold  text-gray-700  m-4 p-2 rounded-sm group text-center">
                  Thông Tin Đặt Hàng
                </ul>
              </div>
              <div>
                <div className="text-gray-400 text-center">
                  <span>Bạn cần nhập đầy đủ các trường thông tin có dấu *</span>
                  <br />
                </div>
                <div className="">
                  <>
                    <div>
                      <input
                        type="text"
                        {...register("tenkhachhang")}
                        placeholder="Nhập Họ Và Tên *"
                        className="py-3 px-12 border boder-gray-300 rounded-lg  my-2 w-[100%] "
                      />
                    </div>
                  </>
                  <>
                    <div>
                      <input
                        type="text"
                        {...register("sdt")}
                        placeholder="Nhập Số Điện Thoại *"
                        className="py-3 px-12 border boder-gray-300 rounded-lg w-[100%] my-2"
                      />
                    </div>
                  </>
                  <>
                    <div>
                      <input
                        type="text"
                        {...register("diachi")}
                        placeholder="Nhập Địa Chỉ Nhận Hàng *"
                        className="py-3 px-12 border boder-gray-300 rounded-lg w-[100%] my-2"
                      />
                    </div>
                  </>
                  <>
                    <div>
                      <input
                        type="text"
                        {...register("email")}
                        placeholder="Nhập Địa Chỉ Email *"
                        className="py-3 px-12 border boder-gray-300 rounded-lg w-[100%] my-2"
                      />
                    </div>
                  </>
                </div>
                <div>
                  <p>Hình Thức Thanh Toán*</p>
                  <div className="flex justify-around ">
                    <div className="">
                      <input
                        required
                        type="radio"
                        {...register("hinhThucThanhToan")}
                        value="ShipCOD"
                        id="COD"
                      />
                      <label htmlFor="COD">Ship COD</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        {...register("hinhThucThanhToan")}
                        value="Internet Banking"
                        id="Banking"
                      />
                      <label htmlFor="Banking">Internet Banking</label>
                    </div>
                  </div>
                </div>

                <div className=""></div>
              </div>
              <br />
              <div className="flex mb-20 ml-20 mr-20 gap-x-10 font-bold text-2xl">
                <button
                  type="submit"
                  className="px-4 py-2 w-full font-bold text-2xl rounded-md bg-[#00483d] text-white hover:bg-[#23685c] hover:text-white transition-all"
                >
                  Xác Nhận Và Đặt Hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
