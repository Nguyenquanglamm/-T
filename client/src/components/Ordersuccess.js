import React from "react";
import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";



const Ordersuccess = () => {
  if (document === undefined) {
    return <div className="modal"></div>;
  }

  return ReactDOM.createPortal(
    <div className=" fixed flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 inset-0">
      <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
      <div className="max-w-[700px]  w-full space-y-8 z-[9999] bg-white p-10 rounded-lg overflow-hidden">
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#7FB77E"
            className=" m-auto w-[100px] h-[100px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
            />
          </svg>

          <h2 className="mt-6 text-center text-3xl text-gray-900">
            ĐẶT HÀNG THÀNH CÔNG
          </h2>
          <h4 className=" text-center mt-3 mb-5">Cảm ơn bạn đã đặt hàng</h4>
          <div className=" mb-5 max-w-[300px] text-center m-auto py-5 rounded-md shadow-md text-xl bg-[#8fd694] ">

          <NavLink to="/" >Mua thêm sản phẩm khác</NavLink>
          </div>
          <h4 className= " text-xs text-center ">
            Nhân viên của chúng tôi sẽ sớm liên hệ với Quý khách trong thời gian sớm nhất.<br/>
            Nếu Quý khách hàng có thắc mắc, xin vui lòng liên hệ với chúng tôi qua hotline.<br/>
            Khi đơn hàng đã được xác nhận và xuất kho, một số yêu cầu hủy đơn hàng sẽ không thực hiện được.<br/>
            Xin chân thành cảm ơn Quý khách!
          </h4>
        </div>
      </div>
    </div>,
    document.querySelector("body")
  );
};

export default Ordersuccess;
