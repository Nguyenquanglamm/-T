import React from "react";
import ReactDOM from "react-dom";
import {useForm} from "react-hook-form"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {register, handleSubmit} = useForm()
  if (document === undefined) {
    return <div className="modal"></div>;
  }
  // const handleOnSubmit = async (data) => {
  //   const a = await loginUser(data, dispatch, navigate);
  //   if (a) {
  //     setError("login", { type: "custom", message: a });
  //   }
  // };

  const handleOnsubmit = async (data)=> {
    const a = await loginUser(data, dispatch, navigate);
  }

  return ReactDOM.createPortal( 
      <div className=" fixed flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 inset-0">
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
        <div className="max-w-[500px] w-full space-y-8 z-[9999] bg-white p-10 rounded-lg overflow-hidden">
          <div>
          <a href="/">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6  " fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </a>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Đăng nhập vào tài khoản của bạn
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleOnsubmit)}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px ">
              <div>
                <label for="" className="sr-only">
                  
                </label>
                <input
                  id=""
                  name="text"
                  type="text"
                  autocomplete="text"
                  required
                  className=" mb-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Tài Khoản"
                  {...register("username")}
                />
              </div>
              <div>
                <label for="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Mật Khẩu"
                  {...register("password")}
                />
              </div>
            </div>
           
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>,document.querySelector("body")
  );
};

export default Login;
