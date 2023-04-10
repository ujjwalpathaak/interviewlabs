import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { login } from "../../provider/userSlice";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const BACKEND_URL = process.env.REACT_APP_DEVELOPMENT_BACKEND_URL;

const Signin = ({ handleHideSignin, handleShowSignup }) => {
  const [oldUserData, setOldUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setOldUserData({ ...oldUserData, [name]: value });
  };

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await axios.post(`${BACKEND_URL}/loginUser`, oldUserData);
      if (response.status === 200) {
        dispatch(
          login({
            name: response.data.name,
            email: response.data.email,
            password: response.data.password,
            loggedIn: true,
          })
        );
      }
      if (response.status === 201) {
        window.alert("Wrong Email or Password");
      }
    } catch (error) {
      console.log(error, "Error in logging in user");
    }
  };

  return (
    <div className="bg-[#EEEEEE] rounded-lg w-fit h-fit z-20 absolute top-0 left-0 right-0 bottom-0 m-auto flex-column justify-center items-center pl-16 pb-16 pr-16 pt-6">
      <div className="flex justify-between items-center">
        <h1 className="font-bold leading-tight text-5xl mt-0 mb-2 text-[#222831]">
          Sign in
        </h1>
        <button
          type="button"
          onClick={handleHideSignin}
          className="bg-white rounded-md h-fit p-2 inline-flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <form className="w-[100%] min-w-[100%]">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name"
                type="text"
                placeholder="abc123@xxxx.com"
                name="email"
                value={oldUserData.email}
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-password"
              >
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-password"
                type="password"
                placeholder="********"
                name="password"
                value={oldUserData.password}
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="w-full">
              <button
                className="shadow bg-[#00ADB5] hover:bg-[#27b118] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
                onClick={handleSubmit}
              >
                Sign in
              </button>
              <button
                className="ml-6 "
                onClick={(event) => [handleHideSignin(), handleShowSignup()]}
              >
                <span className=" text-grey-100 hover:underline">
                  Not a user?
                </span>
              </button>
            </div>
          </div>
        </form>{" "}
      </div>
    </div>
  );
};

export default Signin;
