import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../context/userSlice";

const Main = () => {
  const user = useSelector(selectUser);
  return (
    <div className="bg-[#EEEEEE] w-[100vw] h-[100vh] flex justify-around items-center p-2">
      <div className="mr-2 min-w-[350px] w-[25vw] h-[95vh] flex-col items-centerrounded-lg">
        <div className="bg-[#393E46] min-h-[550px] w-[100%] h-[90%] p-4 flex flex-col justify-start">
          <div className="min-h-[250px] bg-[#EEEEEE] h-[45%] w-[100%] border-solid border-2 mb-4 border-gray-400 rounded-lg">
            a
          </div>
          <div className="min-h-[250px] bg-[#EEEEEE] h-[45%] w-[100%] border-solid border-2 border-gray-400 rounded-lg">
            <h1>{user.name}</h1>
          </div>
        </div>
        <div className="bg-[#00ADB5] h-[5%] w-[100%] flex items-center p-2">
          <h1 className="mr-2 font-medium">Room Code: </h1>
          <span className="mr-2">234-234-234</span>
          <button class="bg-[#EEEEEE] hover:bg-[#e9e8e8] hover:border-black hover:border-2  text-[#222831] font-bold h-fit w-fit p-1 pr-2 pl-2 rounded-full">
            Copy
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-between w-[100%] h-[95vh] border-solid border-2">
        <div className="border-solid border-2 border-gray-400 rounded-lg h-[65%]">
          a
        </div>
        <div className="border-solid border-2 rounded-lg h-[33%] border-gray-400">
          <div className="text-[#EEEEEE] bg-[#222831] font-medium border-solid border-b-2 border-gray-400 w-[100%]">
            Terminal
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Main;
