import React from "react";
import illus from "../../assets/illus2.png";
const JoinRoomPage = () => {
  return (
    <div className="absolute z-[2] w-[100%] h-[100%] bg-[#EEEEEE] flex justify-center items-center">
      <div className="w-[50%] h-[100%] flex justify-center items-center">
        <img className="w-[100%]" src={illus} alt="illus" />
      </div>
      <div className="w-[50%] h-[100%] flex flex-col justify-center items-center">
        <button class="text-2xl m-2 mb-7 bg-transparent hover:bg-[#00ADB5] text-[#00ADB5] font-semibold hover:text-white py-2 px-4 border border-[#00ADB5] hover:border-transparent rounded-full">
          New Session
        </button>
        <input
          type="text"
          class="
          form-control
          block
          w-10%
          px-3
          py-1.5
          text-base
          font-normal
          text-[#393E46]
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded-full
          transition
          ease-in-out
          m-0
          focus:text-[#393E46] focus:bg-white focus:border-[#00ADB5] focus:outline-none
          "
          id="exampleText0"
          placeholder="Already have a code?"
        />
          <button class="text-xl m-2 bg-transparent hover:bg-[#00ADB5] text-[#00ADB5] font-semibold hover:text-white py-2 px-4 border border-[#00ADB5] hover:border-transparent rounded-full">
            Join Session
          </button>
      </div>
    </div>
  );
};

export default JoinRoomPage;
