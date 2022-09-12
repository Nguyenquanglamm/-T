import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {  useParams,useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const UpdateProductDetailsAdmin = () => {
  const [dataPro, setDataPro] = useState([]);
  const [dataV, setDataV] = useState()
  const { handleSubmit, register } = useForm({
    mode:"all"
  });
  const navigate = useNavigate()
  const {idSanPham} = useParams()
  const handleOnSubmit = async (data) => {
    // // console.log(dataV)
    // console.log(data)
    // const formData = new FormData();
    // formData.append("idSanPham", data.idSanPham);
    // formData.append("mausac", data.mausac);
    // formData.append("dungluong", data.dungluong);
    // formData.append("donGia", data.donGia);
    // formData.append("donGiaCu", data.donGiaCu);
    // formData.append("soLuong", data.soLuong);
    // formData.append("hinhanh", data.hinhanh[0]);
    // console.log(data)
    // const checkDetails = await axios.get(
    //   `/api/productdetailss/checkDetails/proID=${dataV.idSanPham}&mausac=${dataV.mausac}&dungluong=${dataV.dungluong}`
    // );
    // if (checkDetails.data.length === 0) {
    //   await axios.put(`/api/productdetailss/${idSanPham}`, dataV).then((data) => {
    //     console.log(data)
    //   });
    //   return;
    // }
    //   alert("Chi tiết của sản phẩm này đã có trong kho")
    await axios.put(`/api/productdetailss/${idSanPham}`, dataV).then((res) => {
          if(res.status === 200) {
            navigate("/Admin/warehouse")
          }
        });
  };
  // console.log(idSanPham)
  useEffect(() => {
    axios.get(`/api/productdetailss/${idSanPham}`).then((res) => {
      setDataPro(res.data);
      setDataV(res.data)
    });
  }, []);
  const handleChangeInput = (e) => {
    // console.log(e.target.name, e.target.value)
    setDataV((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  console.log(dataV)
  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      encType="multipart/form-data"
      className="w-[1200px] m-auto"
    >
      <div className=" text-center text-3xl mt-2">Chi Tiết Sản Phẩm</div>     
      <input
        type="text"
        name="mausac"
        placeholder="Nhập Màu Sắc Sản Phẩm"
        defaultValue={dataPro.mausac}
        onChange={handleChangeInput}
        // {...register("mausac")}
        className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
      />
      <input
        type="text"
        // name="dungluong"
        placeholder="Nhập Dung Lượng Sản Phẩm"
        defaultValue={dataPro.dungluong}
        {...register("dungluong")}
        onChange={handleChangeInput}
        className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
      />
      <input
        type="text"
        // name="donGia"
        placeholder="Nhập Đơn Giá Sản Phẩm"
        defaultValue={dataPro.donGia}        
        {...register("donGia")}
        onChange={handleChangeInput}

        className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
      />

<input
        type="text"
        // name="donGiaCu"
        placeholder="Nhập Đơn Giá Cũ Sản Phẩm"
        defaultValue={dataPro.donGiaCu}        
        {...register("donGiaCu")}
        onChange={handleChangeInput}

        className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
      />

      <input
        type="text"
        // name="soLuong"
        placeholder="Nhập Số Lượng Sản Phẩm"
        defaultValue={dataPro.soLuong}                
        {...register("soLuong")}
        onChange={handleChangeInput}

        className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
      />
      {/* <input type="file" name="hinhanh" {...register("hinhanh")} /> */}
      <button
        type="submit"
        className="h-10 px-6 font-semibold rounded-md bg-[#00483d] text-white hover:bg-[#3D8361]"
      >
        Xác nhận
      </button>
    </form>
  );
};


export default UpdateProductDetailsAdmin;