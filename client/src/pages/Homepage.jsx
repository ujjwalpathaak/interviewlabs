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
        <div className="h-[10%] w-full flex justify-between p-6 ">
          <img className="z-[2] h-8" src={logo} alt="logo" />
          <div className="flex items-center">
            <div className="flex-column">
              {/* <div className="font-extrabold">Guest Login</div> */}
              <div className="mr-4">
                <span className="font-bold">Username:</span> guest@gmail.com
                <span className="font-bold ml-2">Password:</span> guest123
              </div>
            </div>
            <button
              className="bg-[#222831] hover:bg-[#27b118] text-[#EEEEEE] font-bold h-10   py-2 px-4 rounded-full "
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
        <div className="flex flex-row h-[90%]">
          <div className=" h-[100%] w-[40%] flex flex-column justify-center items-center">
            <div className="tracking-tighter flex-column  h-[50%] w-[70%] justify-center items-center">
              <span className="h-16 m-0 block text-[#393E46] font-extrabold text-[350%] z-[2] ">
                Hallelujah!
              </span>
              <span className="h-16 m-0 block font-extrabold text-[350%] text-[#393E46]">
                it's an
              </span>
              <span className="h-16 m-0 block text-[#00ADB5] font-extrabold text-[350%]">
                Interview
              </span>
              <button
                className="bg-[#222831] hover:bg-[#27b118] text-[#EEEEEE] font-bold py-2 px-4 rounded-full mt-6"
                onClick={handleShowSignup}
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="h-[100%] w-[60%] flex justify-center items-center">
            <img className="z-[2] w-[85%]" src={illus} alt="illus" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
