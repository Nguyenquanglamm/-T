import axios from "axios";
import React, { useCallback, useRef, useState } from "react";
import _debounce from "lodash/debounce";
import { v4 as uuidv4 } from "uuid";
import format from 'date-fns/format'
const Searchorder = () => {
  const [SearchData, setSearchData] = useState();
  const refSearch = useRef();
  const fetchDataWithSearch = (key) => {
    axios.get(`/api/order/v4/search?idOrPhone=${key}`).then((res) => {
      setSearchData(res.data);
    });
  };
  const debounceDropDown = useCallback(
    _debounce((nextValue) => fetchDataWithSearch(nextValue), 1000),
    []
  );
  const handleSearchChange = (e) => {
    // if (refSearch.current?.value === "") {
    //   setSearchData("");
    // }
    debounceDropDown(refSearch.current?.value);
  };
  console.log(SearchData);
  return (
    <div className=" w-[1200px] m-auto  ">
      <h1 className=" text-center text-3xl m-5">Kiểm tra đơn hàng của bạn</h1>
      <div className=" flex justify-center m-5">
        <input
          type=""
          name=""
          placeholder="Nhập Mã Đơn Hàng Hoặc Số Điện Thoại"
          className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2 m-auto w-[40%]"
          ref={refSearch}
        />
        <button
          className=" bg-[#00483d] px-5 my-2 hover:bg-[#0c2e29]  text-white rounded-lg "
          onClick={handleSearchChange}
        >
          Kiểm Tra
        </button>
      </div>
      {SearchData && (
        <div>
      
          <table className="w-[900px]  mx-auto text-sm text-left text-gray-500  border">
            <thead className="text-[22px]  bg-gray-50 ">
              <tr>
                <th className="w-[25%]">Tên Khách Hàng</th>
                <th className="w-[25%]">Số Điện Thoại</th>
                <th className="w-[25%]">Ngày Đặt</th>
                <th className="w-[25%]">Trạng Thái Đơn Hàng</th>
              </tr>
            </thead>
          </table>
        </div>
      )}
      {SearchData &&
        SearchData.length > 0 &&
        SearchData.map((item, index) => {
          return (
            <div>
              <table className="w-[900px]  mx-auto text-sm text-left text-gray-500 border ">
                <tbody className="text-[18px]">
                  <th className="w-[25%]">
                    {/* {SearchData &&
                        SearchData.length > 0 &&
                        SearchData.map((item, index) => {
                          return (
                            <div className="" key={uuidv4()}>
                              <span>{item.tenkhachhang}</span>
                            </div>
                          );
                        })} */}
                    {item.tenkhachhang}
                  </th>
                  <th  className="w-[25%]">
                    {item.sdt}
                  </th>
                  <th  className="w-[25%]">
                  {format(new Date(item.ngaytao),'MM/dd/yyyy')}
                  </th>
                  <th  className="w-[25%]">
                  {item.trangthai}
                  </th>
                  {/* <th>
                      {SearchData &&
                        SearchData.length > 0 &&
                        SearchData.map((item, index) => {
                          return (
                            <div className="" key={uuidv4()}>
                              <span>{item.sdt}</span>
                            </div>
                          );
                        })}
                    </th>
                    <th>
                      {SearchData &&
                        SearchData.length > 0 &&
                        SearchData.map((item, index) => {
                          return (
                            <div className="" key={uuidv4()}>
                              <span>{item.ngaytao}</span>
                            </div>
                          );
                        })}
                    </th>
                    <th>
                      {SearchData &&
                        SearchData.length > 0 &&
                        SearchData.map((item, index) => {
                          return (
                            <div className="" key={uuidv4()}>
                              <span className="text-red-600 italic uppercase">
                                {item.trangthai}
                              </span>
                            </div>
                          );
                        })}
                    </th> */}
                </tbody>
              </table>
            </div>
          );
        })}
    </div>
  );
};

export default Searchorder;
