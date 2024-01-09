import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import illus from "../assets/illustration-homepage.png";
import logo from "../assets/logo.png";

import Singup from "../components/Homepage/Singup";
import Signin from "../components/Homepage/Signin";
import { usePeer } from "../context/Peer";

function Homepage() {
  const [isShownSignin, setIsShownSignin] = useState(false);
  const [isShownSignup, setIsShownSignup] = useState(false);
  const navigate = useNavigate();
  const { stream, setStream } = usePeer();

  useEffect(() => {
    const stopCamera = () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        setStream(null);
      }
    }

    stopCamera();
  });


  const handleShowSignin = () => {
    setIsShownSignin((currents) => !currents);
    navigate(`/joinroom`);
  };

  const handleShowSignup = () => {
    setIsShownSignup((currents) => !currents);
  };

  const handleHideSignin = () => {
    setIsShownSignin(false);
  };

  const handleHideSignup = () => {
    setIsShownSignup(false);
  };

  return (
    <div className="h-[100vh] w-[100%] bg-[#EEEEEE] flex justify-center">
      {isShownSignup && (
        <div className="bg-[#000000a1] absolute top-0 left-0 right-0 bottom-0 m-auto z-10" />
      )}
      {isShownSignin && (
        <div className="bg-[#000000a1] absolute top-0 left-0 right-0 bottom-0 m-auto z-10" />
      )}
      <div className="h-[100vh] max-w-screen-xl flex flex-col">
        <div className="sm:h-[10vh] h-fit sm:w-full flex justify-between flex-col items-start p-5 sm:items-center sm:flex-row">
          <img className="z-[2] h-15 sm:h-8" src={logo} alt="logo" />
          <div className="flex items-center justify-between sm:justify-end sm:mt-0 w-full">
            <div className="flex-col flex">
              <div className="sm:w-fit sm:pr-6  mr-2 sm:mr-0 text-sm ">
                <p>
                  <span className="font-bold">Username:</span> guest@gmail.com
                </p>
                <p>
                  <span className="font-bold">Password:</span> guest123
                </p>
              </div>
            </div>
            <button
              className="bg-[#222831] hover:bg-[#27b118] text-[#EEEEEE] s font-bold py-2 px-4 rounded-full"
              onClick={handleShowSignin}
            >
              Sign in
            </button>
          </div>
          {isShownSignin && (
            <Signin
              handleHideSignin={handleHideSignin}
              handleShowSignup={handleShowSignup}
            />
          )}
          {isShownSignup && (
            <Singup
              handleHideSignup={handleHideSignup}
              handleShowSignin={handleShowSignin}
            />
          )}
        </div>
        <div className="flex flex-col h-[80vh] w-full items-center justify-around sm:flex-row sm:h-[90%]">
          <div className="h-[40vh] w-[100%] flex flex-col justify-center items-center pl-0 sm:w-[40%] sm:h-[100%] sm:items-center sm:justify-center">
            <div className="flex flex-col h-[40vh] w-full p-5 sm:w-[80%] justify-center items-start sm:h-[50%] sm:tracking-tighter text-sm lg:text-base">
              <span className="block text-[#393E46] font-extrabold text-[300%] z-[2]  sm:text-[350%] sm:h-14 sm:m-[0px] m-[15px] ml-[0px]">
                Hallelujah!
              </span>
              <span className="block font-extrabold text-[300%] text-[#393E46] sm:text-[350%] sm:h-14 sm:m-[0px] m-[15px] ml-[0px]">
                it's an
              </span>
              <span className="block text-[#00ADB5] font-extrabold text-[300%] sm:text-[350%] sm:h-14 sm:m-[0px] m-[15px] ml-[0px]">
                Interview
              </span>
              <button
                className="bg-[#222831] hover:bg-[#27b118] text-[#EEEEEE] font-bold py-2 px-4 mt-6 rounded-full sm:mt-6"
                onClick={handleShowSignup}
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="h-[40vh] w-[100%] flex justify-center items-center sm:w-[60%] sm:items-center sm:h-[100%] sm:pt-0">
            <img className="z-[2] w-[85%]" src={illus} alt="illus" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
