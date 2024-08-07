import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Peer from "simple-peer";

import { createdRoom } from "../../provider/roomSlice";
import { uniqueIdGenerator } from "../../utils/uniqueIdGenerator";
import { SocketContext } from "../../context/Socket";
import { selectUser } from "../../provider/userSlice";
import { usePeer } from "../../context/Peer";
import { createRoom, getRoom, joinRoomAPI } from "../../service/roomApi";
import loadingGIF from "../../assets/loading.gif";
import bg_dark from "../../assets/bg_dark.svg";
import bg_light from "../../assets/bg_light.svg";

import "./CodeEditArea.css";
import DarkModeToggle from "../../utils/DarkModeToggle";

const Divider = ({ color }) => (
  <div style={{ textAlign: 'center', margin: '0' }}>
    <span style={{
      display: 'inline-block',
      width: '150px',
      borderTop: `2px solid ${color}`,
    }} />
  </div>
);

const JoinRoomPage = ({ setCode }) => {
  const { socket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState();
  const hasMounted = useRef(false);
  const { darkMode } = usePeer();
  const color = darkMode ? '#FFFFFF' : '#001122';
  const textColour = darkMode ? 'text-[#FFFFFF]' : 'text-[#001122]';

  const {
    me,
    setMe,
    stream, 
    setStream,
    setCallerName,
    setCallAccepted,
    MyName,
    setMediaElement,
    setMyName,
    setOtherName,
    myVideo,
    setInCall,
    inCall,
    userVideo,
    connectionRef
  } = usePeer();

  useEffect(() => {
    if (!hasMounted.current) {
      toast.success('User Logged in!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: darkMode ? "dark" : "light",
      });

      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          console.log("Setting Stream: ", stream);
          setStream(stream);
          myVideo.current.srcObject = stream;
        });

      socket.current.emit("get-me");
      socket.current.on("got-me", id => {
        console.log("My ID: ", id);
        setMe(id);
        setMyName(user.name);
      });

      hasMounted.current = true;
    }

  }, [socket, setStream, myVideo, user.name, darkMode, setMe, navigate, userVideo, connectionRef, setMyName]);

  const callUser = (roomDetails) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", data => {
      console.log("Calling user... ", data, roomDetails.ownerId);
      socket.current.emit("call-user", {
        userToCall: roomDetails.ownerId,
        signalData: data,
        from: me,
        name: MyName,
      });
    });

    peer.on("stream", stream => {
      console.log("Stream event fired, User Video: ", stream);
        setMediaElement(stream);
        userVideo.current.srcObject = stream;
        setTimeout(() => {
        navigate(`/room/${roomId}`)
        setLoading(false);
        }, 2000);
    });

    socket.current.on("call-accepted", async data => {
      console.log("Call Accepted: ", data);
      setCallAccepted(true);
      setOtherName(data.name);
      setInCall(true);

      console.log("stream: ", data.stream);

      const data2 = {
        roomId: roomDetails.roomId,
        joiner: user.name,
        joinerId: me,
      };

      setCallerName(user.name);
      await joinRoomAPI(data2);
      console.log(data.signal.signal);
      peer.signal(data.signal.signal);
    });

    
    connectionRef.current = peer;
  };

  const createNewRoom = () => {
    const tempRoomId = uniqueIdGenerator();
    setRoomId(tempRoomId);

    const newRoom = {
      roomId: tempRoomId,
      owner: user.name,
      ownerId: me,
    };

    dispatch(createdRoom(newRoom));
    createRoom(newRoom);

    socket.current.emit("create-new-room", { tempRoomId });
    console.log("Room Created: ", tempRoomId);
    setCode(tempRoomId);
    console.log("Creating new Room: ", tempRoomId);
    navigate(`/room/${tempRoomId}`);
  };

  const joinRoom = async () => {
    setLoading(true);
    if (!roomId) {
      toast.info('Please Fill in the Room Id', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
      });
      setLoading(false);
      return;
    }
  
    try {
      const roomDetails = await getRoom({ roomId });
      console.log("Room Details: ", roomDetails);
      socket.current.emit("try-join-room", { tempRoomId: roomDetails.roomId });
      console.log("Joining Room: ", roomDetails.roomId);
      setCode(roomDetails.roomId);
      callUser(roomDetails);

    } catch (error) {
      toast.error('Failed to join room. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
      });
    }
  };
  
  const handleEnterKey = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <>
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
      <div style={{ backgroundImage: `url(${darkMode ? bg_dark : bg_light})` }} className="bg-cover bg-center w-[100vw] h-[100vh] flex flex-col bg-white dark:bg-[#001122] ">
        <header className="p-5 ml-2 md:ml-16 h-[15%] flex items-center justify-start">
          <DarkModeToggle />
        </header>
        <main className="h-full flex flex-col justify-center items-center p-16 sm:flex-row">
          <div className="w-full mb-5 md:mb-0 md:mr-10 md:w-1/3">
            <div className="w-fit h-fit p-2 bg-[#050537] dark:bg-white">
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                id="selfVideo"
              />
            </div>
          </div>
          <div className="w-1/3">
          {inCall && <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{ objectFit: "cover", height: "100%", display: "none" }}
              />}
            {loading ? (
              <div className="pl-10 bg-gray-200 border-2 border-gray-400 dark:text-white text-zinc-900 dark:bg-[#112036] p-2 rounded-lg">
                <span className=" ">
                  Please wait while you are added to the room by the room owner.
                </span>
                <img src={loadingGIF} className="w-[100px]" alt="Loading-Gif" />
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center md:ml-8">
                <span className="flex sm:flex-row flex-col">
                  <span className="whitespace-nowrap text-base italic sm:text-2xl mb-7 font-semibold text-[#050537] dark:text-white py-2 px-4">Create a </span>
                  <button
                    onClick={createNewRoom}
                    className="whitespace-nowrap text-base sm:text-2xl mb-2 md:mb-7 bg-transparent hover:bg-[#00ADB5] text-[#00ADB5] font-semibold hover:text-white py-2 px-4 border border-[#00ADB5] hover:border-transparent rounded-full"
                  >
                    New Session
                  </button>
                </span>
                <div className="flex flex-row">
                  <Divider color={color} />
                  <span className={`text-lg mx-2 italic ${textColour}`} >or</span>
                  <Divider color={color} />
                </div>
                <div className="flex mt-2 md:mt-7">
                  <input
                    type="text"
                    className="bg-transparent p-2 focus:bg-opacity-0 form-control m-2 w-10% px-3 py-1.5 text-base font-normal text-[#393E46] dark:text-white text-bold bg-white bg-clip-padding border border-solid border-zinc-900 dark:border-gray-300 rounded-full transition ease-in-out focus:text-[#393E46] focus:bg-white focus:border-[#00ADB5] focus:outline-none"
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
            )}
          </div>
        </main>
      </div></>
  );
};

export default JoinRoomPage;
