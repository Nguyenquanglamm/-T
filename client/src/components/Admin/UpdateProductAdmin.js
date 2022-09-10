import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import  {v4 as uuidv4} from "uuid"
// import { options } from "../../../../server/routes/product";

const UpdateProductAdmin = () => {
  const [data, setData] = useState();
  const [cateLabel, setCateLabel] = useState();
  const [promoLabel, setPromoLabel] = useState();
  const [supLabel, setSupLabel] = useState();
  const [promoData, setPromoData] = useState();
  const [suppData, setSupppData] = useState();
  const [cateData, setCateData] = useState();
  const { idSanPham } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/api/products/${idSanPham}`).then((res) => {
      setData(res.data);
      setCateLabel(res.data.categoryid)
      setPromoLabel(res.data.promotionid)
      setSupLabel(res.data.supplierid)
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
      formData.append("categoryid", cateLabel);
      formData.append("promotionid", promoLabel);
      formData.append("supplierid", supLabel);
    } else {
      formData.append("tenSanPham", data.tenSanPham);
      formData.append("categoryid", cateLabel);
      formData.append("promotionid", promoLabel);
      formData.append("supplierid", supLabel);
      formData.append("hinhanh", file);
    }

    axios.put(`/api/products/${idSanPham}`, formData).then((response) => {
      if (response.status === 200) navigate(`/Admin/product`);
    });
  };
  // console.log(data);
  const handleDataId = (id, arrData) => {
    if (!arrData || !id) return;
    const a = arrData.find((item) => item._id == id);
    return a;
  };
  console.log(promoLabel)


  const nameCate = handleDataId(data?.categoryid, cateData);
  const namePromo = handleDataId(data?.promotionid, promoData);
  const nameSupp = handleDataId(data?.supplierid, suppData);
  // console.log(handleDataId(idSanPham,cateData))
  const handleSetFile = (e) => {
    setFile(e.target.files[0]);
  };
  const handleChangeCate = (e) => {
    setCateLabel(e.target.value)
  }
  const handleChangesup = (e) => {
    setSupLabel(e.target.value)
  }
  const handleChangePromo = (e) => {
    setPromoLabel(e.target.value)
  }
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

            <select
              {...register("categoryid")}
              className="py-3 px-12 border border-gray-300 rounded-lg mx-2 my-2"
              value={cateLabel}         
              onChange={handleChangeCate}
            >
              {/* <option value={nameCate?._id}  >{nameCate?.tenLoaiSanPham}</option> */}
              {cateData &&
                cateData.length > 0 &&
                cateData.map((item) => {
                  return (
                    <option value={item._id} key={uuidv4()}>{item?.tenLoaiSanPham}</option>
                  );
                })}
            </select>

            <select
              {...register("supplierid")}
              className="py-3 px-12 border border-gray-300 rounded-lg mx-2 my-2"
              value={supLabel}
              onChange={handleChangesup}
            >
              {/* <option value={nameSupp?._id}>{nameSupp?.tennhacungcap}</option> */}
              {suppData &&
                suppData.length > 0 &&
                suppData.map((item) => {
                  return (
                    <option value={item._id} key={uuidv4()}>{item?.tennhacungcap}</option>
                  );
                })}
            </select>

            <select
              {...register("promotionid")}
              className="py-3 px-12 border border-gray-300 rounded-lg mx-2 my-2"
              value={promoLabel}
              onChange={handleChangePromo}
            >
              {/* <option value={namePromo?._id}>{namePromo?.noidung}</option> */}
              {promoData &&
                promoData.length > 0 &&
                promoData.map((item) => {
                  return <option value={item._id}>{item?.noidung}</option>;
                })}
            </select>
            <button
              type="submit"
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
