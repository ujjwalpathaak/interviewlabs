import React from "react";
import { useState } from "react";
// import { addUser } from "../../services/user.api";
import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Singup = ({ handleHideSignup, handleShowSignin }) => {
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUserData({ ...newUserData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await axios.post(`${BACKEND_URL}/addUser`, newUserData);
      // console.log(response);
      if (response.status === 201) {
        window.alert("User already exists");
        handleHideSignup();
        handleShowSignin();
      }
      if (response.status === 200) {
        window.alert("User added");
      }
      if (response.status === 203) {
        window.alert("Error adding user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#EEEEEE] w-fit h-fit z-20 rounded-lg absolute top-0 left-0 right-0 bottom-0 m-auto flex-column justify-center items-center pl-16 pb-16 pr-16 pt-6">
      <div className="flex justify-between mb-6 items-center">
        <h1 className="font-bold leading-tight text-5xl mt-0 mb-2 text-[#222831]">
          Sign up
        </h1>
        <button
          type="button"
          onClick={handleHideSignup}
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
        <form className="w-[100%] min-w-[100%]" action="#">
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name2"
              >
                Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name2"
                type="text"
                required
                name="name"
                value={newUserData.name}
                onChange={(e) => handleChange(e)}
                placeholder="Rahul"
              />
            </div>
          </div>
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
                value={newUserData.email}
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
                value={newUserData.password}
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="w-full">
              <button
                type="submit"
                onClick={handleSubmit}
                className="shadow bg-[#00ADB5] hover:bg-[#27b118] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                Sign Up
              </button>
              <button
                className="ml-6"
                onClick={(event) => [handleHideSignup(), handleShowSignin()]}
              >
                <span className="text-grey-100 hover:underline">
                  Already a user?
                </span>
              </button>
            </div>
          </div>
        </form>{" "}
      </div>
    </div>
  );
};

export default Singup;
