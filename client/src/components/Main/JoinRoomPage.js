import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./CodeEditArea.css";
import { createdRoom, joinedRoom } from "../../provider/roomSlice";
import { uniqueIdGenerator } from "../../utils/uniqueIdGenerator";
import { SocketContext } from "../../context/Socket";
import { selectUser } from "../../provider/userSlice";
import { selectRoom } from "../../provider/roomSlice";
import { usePeer } from "../../context/Peer";
import ReactPlayer from "react-player";
import {
  createRoom,
  joinRoom,
  getRoom,
  getSocketId,
} from "../../service/roomApi";
import Peer from "simple-peer";
import io from "socket.io-client";

const JoinRoomPage = ({ setCode }) => {
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const room = useSelector(selectRoom);
  const [roomId, setRoomId] = useState();
  const [vid, setVid] = useState({});
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const {
    me,
    setMe,
    stream,
    setStream,
    receivingCall,
    setReceivingCall,
    caller,
    setCaller,
    callerName,
    setCallerName,
    callerSignal,
    setCallerSignal,
    callAccepted,
    setCallAccepted,
    idToCall,
    setIdToCall,
    callEnded,
    setCallEnded,
    name,
    setName,
    myVideo,
    userVideo,
    connectionRef,
  } = usePeer();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        // console.log(stream);
        setStream(stream);
        setVid(stream);
        myVideo.current.srcObject = stream;
      });
    socket.current.emit("get-me");
    socket.current.on("got-me", (id) => {
      console.log(id);
      setMe(id);
      setName(user.name);
    });
  }, []);

  const callUser = (roomDetails, ownerID) => {
    console.log("calling user: ", roomDetails.owner);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: roomDetails.ownerId,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.current.on("callAccepted", async (signal) => {
      console.log("call accepted");
      setCallAccepted(true);
      let data2 = {
        roomId: roomDetails.roomId,
        joiner: user.name,
        joinerId: me,
      };
      setCallerName(user.name);
      await joinRoom(data2);
      peer.signal(signal);
      navigate(`/room/${roomId}`);
    });

    connectionRef.current = peer;
  };

  const createNewRoom = () => {
    let tempRoomId = uniqueIdGenerator();
    setRoomId(tempRoomId);
    dispatch(
      createdRoom({
        roomId: tempRoomId,
        owner: user.name,
        ownerId: me,
      })
    );
    createRoom({
      roomId: tempRoomId,
      owner: user.name,
      ownerId: me,
    });
    socket.current.emit("join-room", {
      tempRoomId: tempRoomId,
    });
    setCode(tempRoomId);
    navigate(`/room/${tempRoomId}`);
  };

  const joinRoom = async () => {
    if (!roomId) {
      window.alert("Please Fill in Room Id");
      return;
    }
    let roomDetails = await getSocketId({
      roomId: roomId,
    });
    socket.current.emit("join-room", {
      tempRoomId: roomDetails.roomId,
    });
    setCode(roomDetails.roomId);
    callUser(roomDetails);
  };

  const handleEnterKey = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="absolute z-[2] w-[100%] h-[100%] bg-[#EEEEEE] flex justify-center items-center flex-col sm:flex-row">
      <div className="w-full sm:w-[30%] h-[100%] flex flex-col mb-8 sm:mb-0 justify-end sm:justify-center items-center">
        <video
          playsInline
          muted
          ref={myVideo}
          autoPlay
          id="selfVideo"
          // style={{ width: "500px" }}
        />
      </div>
      <div className="w-full sm:w-[30%] h-[100%] flex flex-col justify-start sm:justify-center items-center">
        <button
          onClick={createNewRoom}
          className="whitespace-nowrap text-base sm:text-2xl m-2 mb-7 bg-transparent hover:bg-[#00ADB5] text-[#00ADB5] font-semibold hover:text-white py-2 px-4 border border-[#00ADB5] hover:border-transparent rounded-full"
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
          className="whitespace-nowrap text-base sm:text-xl m-2 bg-transparent hover:bg-[#00ADB5] text-[#00ADB5] font-semibold hover:text-white py-2 px-4 border border-[#00ADB5] hover:border-transparent rounded-full"
        >
          Join Session
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPage;
