import React, { useState } from "react";
import illus from "../assets/illustration-homepage.png";
import logo from "../assets/logo.png";
import Singup from "../components/Homepage/Singup";
import Signin from "../components/Homepage/Signin";
function Homepage() {
  const [isShownSignin, setIsShownSignin] = useState(false);
  const [isShownSignup, setIsShownSignup] = useState(false);

  const handleShowSignin = () => {
    setIsShownSignin((current) => !current);
  };

  const handleShowSignup = () => {
    setIsShownSignup((current) => !current);
  };

  const handleHideSignin = () => {
    setIsShownSignin(false);
  };

  const handleHideSignup = () => {
    setIsShownSignup(false);
  };

  return (
    <div className="h-[100vh] w-full bg-[#EEEEEE] flex justify-center font-sans">
      {isShownSignup && (
        <div className="bg-[#000000a1] absolute top-0 left-0 right-0 bottom-0 m-auto z-10" />
      )}
      {isShownSignin && (
        <div className="bg-[#000000a1] absolute top-0 left-0 right-0 bottom-0 m-auto z-10" />
      )}
      <div className="max-h-[1080px] max-w-screen-xl ">
        <div className="h-fit w-full flex flex-col justify-between p-6 sm:flex-row sm:h-[10%]">
          <img className="z-[2] h-12 sm:h-8" src={logo} alt="logo" />
          <div className="flex items-center">
            <div className="flex-column">
              {/* <div className="font-extrabold">Guest Login</div> */}
              <div className="mr-4">
                <span className="font-bold">Username:</span> guest@gmail.com
                <span className="font-bold ml-2">Password:</span> guest123
              </div>
            </div>
            <button
              className="bg-[#222831] hover:bg-[#27b118] text-[#EEEEEE] font-bold h-10 px-6 rounded-full sm:px-4 sm:py-2"
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
        <div className="flex flex-col h-fit sm:flex-row sm:h-[90%]">
          <div className=" h-fit w-[100%] flex flex-col justify-left items-start pl-4 sm:w-[40%] sm:h-[100%] sm:items-center sm:justify-center sm:pl-0">
            <div className="flex-col h-fit w-[60%] justify-center items-center sm:h-[50%] sm:tracking-tighter ">
              <span className="m-0 block text-[#393E46] font-extrabold text-[230%] z-[2]  sm:text-[350%] sm:h-14">
                Hallelujah!
              </span>
              <span className="m-0 block font-extrabold text-[230%] text-[#393E46] sm:text-[350%] sm:h-14">
                it's an
              </span>
              <span className="m-0 block text-[#00ADB5] font-extrabold text-[230%] sm:text-[350%] sm:h-14">
                Interview
              </span>
              <button
                className="bg-[#222831] hover:bg-[#27b118] text-[#EEEEEE] font-bold py-2 px-4 rounded-full sm:mt-6"
                onClick={handleShowSignup}
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="h-fit w-[100%] flex justify-center pt-6 items-start sm:w-[60%] sm:items-center sm:h-[100%] sm:pt-0">
            <img className="z-[2] w-[85%]" src={illus} alt="illus" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
