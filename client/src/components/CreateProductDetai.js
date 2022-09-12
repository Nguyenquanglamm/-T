import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateProductDetai = () => {
  const [dataPro, setDataPro] = useState([]);
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate()
  const handleOnSubmit = async (data) => {
    const formData = new FormData();
    formData.append("idSanPham", data.idSanPham);
    formData.append("mausac", data.mausac);
    formData.append("dungluong", data.dungluong);
    formData.append("donGia", data.donGia);
    formData.append("donGiaCu", data.donGiaCu);
    formData.append("soLuong", data.soLuong);
    formData.append("hinhanh", data.hinhanh[0]);

    const checkDetails = await axios.get(
      `/api/productdetailss/checkDetails/proID=${data.idSanPham}&mausac=${data.mausac}&dungluong=${data.dungluong}`
    );
    if (checkDetails.data.length === 0) {
      await axios.post("/api/productdetailss", formData).then((data) => {
        if(data.status === 200){
          navigate("/admin/product")
        }
      });
      return;
    }
      alert("Chi tiết của sản phẩm này đã có trong kho")
  };

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      setDataPro(res.data);
    });
  }, []);
  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      encType="multipart/form-data"
      className="w-[1200px] m-auto"
    >
      <div className=" text-center text-3xl mt-2">Chi Tiết Sản Phẩm</div>
      <select
        id="idSanPham"
        {...register("idSanPham")}
        className="py-3 px-12 border border-gray-300 rounded-lg mx-2 my-2"
      >
        <option value="">Sản phẩm</option>
        {dataPro &&
          dataPro.length > 0 &&
          dataPro.map((item) => {
            return (
              <option value={item._id} key={item._id}>
                {item.tenSanPham}
              </option>
            );
          })}
      </select>

      <input
        type="text"
        name="mausac"
        placeholder="Nhập Màu Sắc Sản Phẩm"
        {...register("mausac")}
        className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
      />
      <input
        type="text"
        name="dungluong"
        placeholder="Nhập Dung Lượng Sản Phẩm"
        {...register("dungluong")}
        className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
      />
      <input
        type="text"
        name="donGia"
        placeholder="Nhập Đơn Giá Sản Phẩm"
        {...register("donGia")}
        className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
      />

<input
        type="text"
        name="donGiaCu"
        placeholder="Nhập Đơn Giá Cũ Sản Phẩm"
        {...register("donGiaCu")}
        className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
      />

      <input
        type="text"
        name="soLuong"
        placeholder="Nhập Số Lượng Sản Phẩm"
        {...register("soLuong")}
        className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
      />
      <input type="file" name="hinhanh" {...register("hinhanh")} />
      <button
        type="submit"
        className="h-10 px-6 font-semibold rounded-md bg-[#00483d] text-white hover:bg-[#3D8361]"
      >
        Thêm chi tiết Sản Phẩm
      </button>
    </form>
  );
};

export default CreateProductDetai;
