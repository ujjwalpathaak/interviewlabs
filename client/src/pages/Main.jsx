import React, { useEffect, useState, useContext, useRef } from "react";
import { useSelector } from "react-redux";
import Peer from "simple-peer";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import CodeEditArea from "../components/Main/CodeEditArea";
import { usePeer } from "../context/Peer";
import { SocketContext } from "../context/Socket";
import { selectUser } from "../provider/userSlice";
import { deleteRoom } from "../service/roomApi";
import DarkModeToggle from "../utils/DarkModeToggle";

import no_user_light from "../assets/images.png"
import no_user_dark from "../assets/dark_images.jpg"

const Main = ({ code, bg_dark, bg_light }) => {
  const [loading, setLoading] = useState(false);
  const hasMounted = useRef(false);
  const { socket } = useContext(SocketContext);
  const otherVideo = useRef(null);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const {
    stream,
    setStream,
    setInCall,
    inCall,
    receivingCall,
    setReceivingCall,
    caller,
    setCaller,
    callerSignal,
    otherName,
    darkMode,
    MyName,
    mediaElement,
    setCallerSignal,
    callAccepted,
    setCallAccepted,
    setCallEnded,
    setMediaElement,
    setOtherName,
    myVideo,
    userVideo,
    connectionRef,
  } = usePeer();

  useEffect(() => {
    console.log("Media Element: ", mediaElement);
    console.log("Other Video: ", otherVideo.current);
    console.log("User Video: ", userVideo.current);
    if (mediaElement && otherVideo.current) {
      // console.log(mediaElement);
      console.log(otherVideo.current);
      otherVideo.current.srcObject = mediaElement;
    }
  }, [mediaElement, userVideo]);
  
  useEffect(() => {
    socket.current.on("incoming-call", (data) => {
      console.log("incoming call", data);
      setReceivingCall(true);
      setOtherName(data.name);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });

    socket.current.on("user-left", () => {
      if(userVideo.current) userVideo.current.srcObject = null;
      else otherVideo.current.srcObject = null;
      toast.info("Other user left the call", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: darkMode ? "dark" : "light",
      });

      setTimeout(() => {
      console.log("Other user Left");
      navigate(`/`);
      window.location.reload(true);
      }, 3000);
    });
    
    if (!hasMounted.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
          myVideo.current.srcObject = stream;
        });
    }
    hasMounted.current = true;
  }, [darkMode, myVideo, navigate, setCaller, setCallerSignal, setOtherName, setReceivingCall, setStream, socket, userVideo]);

  const answerCall = () => {
    setCallAccepted(true);
    console.log("answering call");
    setInCall(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      console.log("Answering call... ", data);
      socket.current.emit("answer-incoming-call", { signal: data, to: caller, from: socket.current.id, name_from: MyName, stream: stream });
    });
    peer.on("stream", (stream) => {
      console.log("stream", stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
      else {
        setMediaElement(stream);
      }
    });
    console.log("Caller Signal: ", callerSignal);
    peer.signal(callerSignal);
    connectionRef.current = peer;
  };
 
  const leaveCall = () => {
    socket.current.emit("leave-call",{roomId: code});
    if(userVideo.current) userVideo.current.srcObject = null;
    else otherVideo.current.srcObject = null;
    setInCall(false);
    console.log("Leaving call");
    toast.info("Leaving Call...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: darkMode ? "dark" : "light",
    });
    setTimeout(() => {
    deleteRoom({ roomId: code });
    navigate(`/`);
    window.location.reload(true);
    }, 3000);
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
      <div style={{ backgroundImage: `url(${darkMode ? bg_dark : bg_light})` }} className="bg-cover bg-center w-[100vw] h-[100vh] flex flex-col sm:justify-around items-center sm:flex-row">
        <div className="w-full h-[30vh] flex-col sm:rounded-lg sm:h-[100vh] sm:p-6 sm:pr-3 sm:w-[25vw] sm:min-w-[350px]">
          <div className="bg-gray-200 border-2 border-gray-400 dark:bg-[#001122] w-[100%] h-full flex flex-row justify-evenly sm:h-[95%] sm:flex-col sm:p-4 sm:min-h-[550px] rounded-t-lg">
            <div style={{ backgroundImage: `url(${darkMode ? no_user_dark : no_user_light})` }} className="bg-cover bg-center min-h-[250px] relative h-fit w-[50%] border-solid border-2 border-gray-400 sm:rounded-lg sm:w-[100%] sm:h-fit">
              {inCall && <video
                playsInline
                ref={userVideo.current === null ? otherVideo : userVideo}
                autoPlay
                style={{ objectFit: "cover", height: "100%" }}
              />}
              {inCall ? <span className="absolute left-1 bottom-0 z-10 font-bold">{`${otherName}`}</span> : <span className="absolute left-1 bottom-0 z-10 font-bold">No user</span>}
            </div>
            <div className="min-h-[250px] relative  h-fit w-[50%] border-solid border-2 border-gray-400 sm:rounded-lg sm:w-[100%] sm:h-fit">
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ objectFit: "cover", height: "100%" }}
              />
              <span className="absolute bottom-0 left-1 z-10 font-bold">{`You (${user.name})`}</span>
            </div>
            <div className="z-10 pl-5 pr-5 flex flex-col justify-center ">
              {receivingCall && !callAccepted ? (
                <div className="caller dark:text-white text-zinc-900 dark:bg-[#112036]  bg-gray-100 border-solid border-2 border-gray-400 p-2 rounded">
                  <h1 className=" font-extrabold m-2">
                    {`${otherName} is calling...`}
                  </h1>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={answerCall}
                  >
                    Answer
                  </button>
                </div>
              ) : null}
              <div className="flex items-center mt-5 justify-center">
                <DarkModeToggle />
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={leaveCall}
                >
                  {
                    inCall ? "End Call" : "Leave Meeting"
                  }
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 border-2 border-gray-400 border-t-0 dark:text-white text-zinc-900 dark:bg-[#112036] h-[5%] w-[100%] flex items-center p-4 rounded-b-lg">
            <h1 className="mr-2 ">Room Code: {code}</h1>
            <button
              className="focus:outline-none dark:text-white underline font-medium rounded-lg text-xs p-1"
              onClick={async () => {
                await navigator.clipboard.writeText(code);
                toast.success('Code copied to clipboard!', {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  theme: darkMode ? "dark" : "light",
                });
              }}
            >
              Copy Id
            </button>
          </div>
        </div>
        <div className=" flex flex-col justify-between mt-6 sm:mt-0 w-[100%] h-[60vh] sm:p-6 sm:pl-3 sm:h-[100vh] sm:w-[75vw]">
          {loading === true ? (
            <img
              className="z-10 h-20 w-20 absolute top-1/2 left-1/2 "
              src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
              alt="loading"
            />
          ) : (
            <></>
          )}
          <CodeEditArea code={code} loading={loading} setLoading={setLoading} />
        </div>
      </div >
    </>
  );
};

export default Main;
