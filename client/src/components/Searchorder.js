import React from 'react';

const Searchorder = () => {
    return (
        <div className=' w-[1200px] m-auto  '>
            <h1 className=' text-center text-3xl m-5'>Kiểm tra đơn hàng của bạn</h1>
            <div className=' flex justify-center m-5'>
            <input
          type=""
          name=""
          placeholder="Nhập Mã Đơn Hàng"
          className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2 m-auto w-[40%]"
        />
            <button className=' bg-[#00483d] px-5 my-2 hover:bg-[#0c2e29]  text-white rounded-lg '>Kiểm Tra</button>
            </div>
            
        </div>
    );
};

export default Searchorder;