import React, { useState } from "react";
import { uniqueIdGenerator } from "../../utils/uniqueIdGenerator";
import illus from "../../assets/illus2.png";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../providers/Socket";
import { selectUser } from "../../context/userSlice";
import { useSelector } from "react-redux";
const JoinRoomPage = () => {
  const { socket } = useSocket();
  const user = useSelector(selectUser);
  let name = user.name;
  // socket.emit('join-room', {roomId: '1', name: "arjun"})
  const [roomId, setRoomId] = useState();

  const navigate = useNavigate();
  const createNewRoom = () => {
    let tempRoomId = uniqueIdGenerator();
    console.log(tempRoomId);
    setRoomId(tempRoomId);
  };

  const joinRoom = () => {
    if (!roomId) {
      window.alert("Please Fill in Room Id");
      return;
    }
    socket.emit("join-room", { roomId, name });

    navigate(`/room/${roomId}`);
  };

  const handleEnterKey = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="absolute z-[2] w-[100%] h-[100%] bg-[#EEEEEE] flex justify-center items-center flex-col sm:flex-row">
      <div className="w-[100%] h-[100%] flex justify-center items-center sm:w-[50%] sm:h-[100%] ">
        <img className="w-[100%]" src={illus} alt="illus" />
      </div>
      <div className="w-[50%] h-[100%] flex flex-col justify-center items-center">
        <button
          onClick={createNewRoom}
          className="text-2xl m-2 mb-7 bg-transparent hover:bg-[#00ADB5] text-[#00ADB5] font-semibold hover:text-white py-2 px-4 border border-[#00ADB5] hover:border-transparent rounded-full"
        >
          New Session
        </button>
        <input
          type="text"
          className="
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
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          onKeyUp={handleEnterKey}
        />
        <button
          onClick={joinRoom}
          className="text-xl m-2 bg-transparent hover:bg-[#00ADB5] text-[#00ADB5] font-semibold hover:text-white py-2 px-4 border border-[#00ADB5] hover:border-transparent rounded-full"
        >
          Join Session
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPage;
