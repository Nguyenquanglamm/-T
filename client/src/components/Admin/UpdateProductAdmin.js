import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
// import { options } from "../../../../server/routes/product";

const UpdateProductAdmin = () => {
  const [data, setData] = useState();
  const [promoData, setPromoData] = useState();
  const [suppData, setSupppData] = useState();
  const [cateData, setCateData] = useState();
  const { idSanPham } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/api/products/${idSanPham}`).then((res) => {
      setData(res.data);
    });
    axios.get("/api/promotions").then((res) => {
      setPromoData(res.data);
    });
    axios.get("/api/categorys").then((res) => {
      setCateData(res.data);
    });
    axios.get("/api/supplier").then((res) => {
      setSupppData(res.data);
    });
  }, [idSanPham]);
  const [file, setFile] = useState();
  const { register, handleSubmit } = useForm();
  const handleOnSubmit = (data) => {
    const formData = new FormData();
    if (!file) {
      formData.append("tenSanPham", data.tenSanPham);
      formData.append("categoryid", data.categoryid);
      formData.append("promotionid", data.promotionid);
      formData.append("supplierid", data.supplierid);
    } else {
      formData.append("tenSanPham", data.tenSanPham);
      formData.append("categoryid", data.categoryid);
      formData.append("promotionid", data.promotionid);
      formData.append("supplierid", data.supplierid);
      formData.append("hinhanh", file);
    }

    console.log(data);
    axios.put(`/api/products/${idSanPham}`, formData).then((response) => {
      console.log(response);
    });
  };
  // console.log(data);
  const handleDataId = (id, arrData) => {
    if (!arrData || !id) return;
    const a = arrData.find((item) => item._id == id);
    return a;
  };

  const nameCate = handleDataId(data?.categoryid, cateData);
  const namePromo = handleDataId(data?.promotionid, promoData);
  const nameSupp = handleDataId(data?.supplierid, suppData);
  console.log(namePromo)
  // console.log(handleDataId(idSanPham,cateData))

  const handleSetFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <>
      {data && (
        <div className=" w-[1200px] m-auto">
          <div className="flex page-container  items-center gap-x-5"></div>

          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            encType="multipart/form-data"
          >
            <input
              type="text"
              id="tenSanPham"
              defaultValue={data.tenSanPham}
              {...register("tenSanPham")}
              placeholder="Tên sản phẩm"
              className="py-3 px-12 border boder-gray-300 rounded-lg mx-2 my-2"
            />

            <select {...register("categoryid")}
            className="py-3 px-12 border border-gray-300 rounded-lg mx-2 my-2"
            >
              <option value={nameCate?._id}>{nameCate?.tenLoaiSanPham}</option>
              {cateData &&
                cateData.length > 0 &&
                cateData.map((item) => {
                  return (
                    <option value={item._id}>{item?.tenLoaiSanPham}</option>
                  );
                })}
            </select>

            <select {...register("supplierid")}className="py-3 px-12 border border-gray-300 rounded-lg mx-2 my-2"
        >
              <option value={nameSupp?._id}>{nameSupp?.tennhacungcap}</option>
              {suppData &&
                suppData.length > 0 &&
                suppData.map((item) => {
                  return (
                    <option value={item._id}>{item?.tennhacungcap}</option>
                  );
                })}
            </select>

            <select {...register("promotionid")}className="py-3 px-12 border border-gray-300 rounded-lg mx-2 my-2"
        >
              <option value={namePromo?._id}>{namePromo?.noidung}</option>
              {promoData &&
                promoData.length > 0 &&
                promoData.map((item) => {
                  return (
                    <option value={item._id}>{item?.noidung}</option>
                  );
                })}
            </select>
            <button
              type="submit"
              onClick={() => {
                navigate(`/Admin/product`);
              }}
              className="bg-gray-400 rounded-lg text-black  hover:bg-gray-600 hover:text-white  px-3 py-2 text-base font-medium"
            >
              Cập Nhật
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateProductAdmin;
