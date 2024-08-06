import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { usePeer } from "../context/Peer";
import 'react-toastify/dist/ReactToastify.css';

import { login } from "../provider/userSlice";
import { signIn, signUp } from "../service/roomApi";

import logo from "../assets/logo.png";
import dark_logo from "../assets/dark_logo.png";
import loadingGIF from "../assets/loading.gif";
import DarkModeToggle from "../utils/DarkModeToggle";

const Homepage = ({ bg_dark, bg_light }) => {
  const dispatch = useDispatch();
  const { stream, setStream, darkMode, setMyName } = usePeer();
  const navigate = useNavigate();

  const [isShownSignin, setIsShownSignin] = useState(false);
  const [isShownSignup, setIsShownSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oldUserData, setOldUserData] = useState({ email: "", password: "" });
  const [newUserData, setNewUserData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    const stopCamera = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    };
    stopCamera();
  }, [stream, setStream]);

  const handleShowSignin = () => {
    setIsShownSignin(true);
  };

  const handleShowSignup = () => {
    setIsShownSignup(true);
  };

  const handleHideSignin = () => setIsShownSignin(false);
  const handleHideSignup = () => setIsShownSignup(false);

  const handleChangeSignin = (event) => {
    const { name, value } = event.target;
    setOldUserData({ ...oldUserData, [name]: value });
  };

  const handleChangeSignup = (event) => {
    const { name, value } = event.target;
    setNewUserData({ ...newUserData, [name]: value });
  };

  const handleSubmitSignin = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await signIn(oldUserData);
      if (response.status === 200) {
        dispatch(login({ name: response.data.name, email: response.data.email, password: response.data.password, loggedIn: true }));
        setMyName(response.data.name);
        navigate(`/joinroom`);
      } else if (response.status === 201) {
        toast.error('Wrong credentials!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: darkMode ? "dark" : "light"
        });
      }
    } catch (error) {
      console.error(error, "Error in logging in user");
    }
    setLoading(false);
  };

  const handleSubmitSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await signUp(newUserData);
      if (response.status === 201) {
        toast.info('User already exisits!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: darkMode ? "dark" : "light",
        });
        handleHideSignup();
        handleShowSignin();
      } else if (response.status === 200) {
        toast.success('New User created!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: darkMode ? "dark" : "light",
        });
      } else if (response.status === 203) {
        window.alert("Error adding user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${darkMode ? bg_dark : bg_light})` }} className="bg-cover bg-center h-screen w-full bg-white dark:bg-zinc-900 bg-[] flex justify-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
      {(isShownSignup || isShownSignin) && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-10" />
      )}
      <div className="h-screen max-w-screen-xl min-w-[80%] flex flex-col relative">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 md:p-5">
          <img className="h-15 sm:h-8 z-10" src={darkMode ? dark_logo : logo} alt="logo" />
          <div className="flex items-center justify-between sm:justify-end w-full">
            <DarkModeToggle />
            <div class="max-w-xs bg-gray-200 dark:bg-zinc-700 border mr-0 md:mr-10 border-gray-300 dark:border-zinc-800 rounded-xl shadow-lg" role="alert" tabindex="-1" aria-labelledby="hs-toast-normal-example-label">
              <div class="flex p-2">
                <div class="shrink-0 mr-2 flex justify-center items-center">
                  <svg class="shrink-0 size-4 text-blue-500 dark:text-white mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"></path>
                  </svg>
                </div>
                <div class="ms-3">
                  <p class="text-xs text-gray-700 dark:text-white">
                    <p><span className="font-bold">Username:</span> guest@gmail.com</p>
                    <p><span className="font-bold">Password:</span> guest123</p>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {isShownSignin && (
            <div className="bg-[#EEEEEE] rounded-lg w-fit h-fit z-20 absolute top-0 left-0 right-0 bottom-0 m-auto flex-column justify-center items-center pl-16 pb-16 pr-16 pt-6">
              <div className="flex justify-between items-center">
                <h1 className="font-bold leading-tight text-5xl mt-0 mb-2 text-[#222831]">Sign in</h1>
                <button
                  type="button"
                  onClick={handleHideSignin}
                  className="bg-white rounded-md h-fit p-2 inline-flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                {loading ? (
                  <div className="flex justify-center flex-col">
                    <span>Please wait the server hosted on <a href="https://render.com/">Render</a> server might be booting up :) free services</span>
                    <img src={loadingGIF} className="w-[100px]" alt="Loading-Gif" />
                  </div>
                ) : (
                  <form className="w-[100%] min-w-[100%]" onSubmit={handleSubmitSignin}>
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/4">
                        <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">Email</label>
                      </div>
                      <div className="md:w-3/4">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-full-name"
                          type="text"
                          placeholder="abc123@xxxx.com"
                          name="email"
                          value={oldUserData.email}
                          required
                          onChange={handleChangeSignin}
                        />
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/4">
                        <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="inline-password">Password</label>
                      </div>
                      <div className="md:w-3/4">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="inline-password"
                          type="password"
                          placeholder="********"
                          name="password"
                          value={oldUserData.password}
                          required
                          onChange={handleChangeSignin}
                        />
                      </div>
                    </div>
                    <div className="md:flex md:items-center">
                      <div className="md:w-1/4"></div>
                      <div className="w-full">
                        <button
                          className="shadow bg-[#00ADB5] hover:bg-[#27b118] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                          type="submit"
                        >
                          Sign in
                        </button>
                        <button
                          className="ml-6"
                          onClick={() => { handleHideSignin(); handleShowSignup(); }}
                        >
                          <span className="underline text-grey-100 hover:underline">Not a user?</span>
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
          {isShownSignup && (
            <div className="bg-[#EEEEEE] w-fit h-fit z-20 rounded-lg absolute top-0 left-0 right-0 bottom-0 m-auto flex-column justify-center items-center pl-16 pb-16 pr-16 pt-6">
              <div className="flex justify-between mb-6 items-center">
                <h1 className="font-bold leading-tight text-5xl mt-0 mb-2 text-[#222831]">Sign up</h1>
                <button
                  type="button"
                  onClick={handleHideSignup}
                  className="bg-white rounded-md h-fit p-2 inline-flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <form className="w-[100%] min-w-[100%]" onSubmit={handleSubmitSignup}>
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/4">
                      <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="inline-full-name2">Name</label>
                    </div>
                    <div className="md:w-3/4">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name2"
                        type="text"
                        required
                        name="name"
                        value={newUserData.name}
                        onChange={handleChangeSignup}
                        placeholder="Rahul"
                      />
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/4">
                      <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">Email</label>
                    </div>
                    <div className="md:w-3/4">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name"
                        type="text"
                        placeholder="abc123@xxxx.com"
                        name="email"
                        value={newUserData.email}
                        required
                        onChange={handleChangeSignup}
                      />
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/4">
                      <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="inline-password">Password</label>
                    </div>
                    <div className="md:w-3/4">
                      <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-password"
                        type="password"
                        placeholder="********"
                        name="password"
                        value={newUserData.password}
                        required
                        onChange={handleChangeSignup}
                      />
                    </div>
                  </div>
                  <div className="md:flex md:items-center">
                    <div className="md:w-1/4"></div>
                    <div className="w-full">
                      <button
                        type="submit"
                        className="shadow bg-[#00ADB5] hover:bg-[#27b118] focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      >
                        Sign Up
                      </button>
                      <button
                        className="ml-6"
                        onClick={() => { handleHideSignup(); handleShowSignin(); }}
                      >
                        <span className="text-grey-100 hover:underline">Already a user?</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </header>
        <main className="flex flex-col h-full items-center justify-around sm:flex-row">
          <div className="flex flex-col items-center justify-center h-50 sm:w-2/5 sm:h-full p-5 pt-0 text-center">
            <div className="space-y-4">
              <span className="block text-gray-800 dark:text-gray-200 font-extrabold text-6xl sm:text-8xl">Hallelujah!</span>
              <span className="block font-extrabold text-6xl text-gray-800 dark:text-gray-200 sm:text-8xl">it's an</span>
              <span className="block text-teal-600 dark:text-blue-300 font-extrabold text-6xl sm:text-8xl">Interview</span>
            </div>
            <button
              className="min-w-10 bg-gray-800 mt-12 dark:bg-gray-200 hover:bg-green-600 dark:hover:bg-green-300 text-white text-2xl dark:text-zinc-900 font-bold py-2 px-4 rounded-full"
              onClick={handleShowSignin}
            >
              Get Started
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Homepage;
