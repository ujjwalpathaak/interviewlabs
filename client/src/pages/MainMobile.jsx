import React, { useEffect, useState, useContext, useRef } from "react";
import { useSelector } from "react-redux";

import { usePeer } from "../context/Peer";
import { SocketContext } from "../context/Socket";
import { selectUser } from "../provider/userSlice";
import Peer from "simple-peer";
import { deleteRoom } from "../service/roomApi";
import { useNavigate } from "react-router-dom";

const MainMobile = ({ code, mobile }) => {
  const { socket } = useContext(SocketContext);
  const [loading, setLoading] = useState(false);
  const [inCall, setInCall] = useState(false);
  const hasMounted = useRef(false);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const {
    stream,
    setStream,
    receivingCall,
    setReceivingCall,
    caller,
    setCaller,
    callerSignal,
    setCallerSignal,
    callAccepted,
    setCallAccepted,
    setCallEnded,
    name,
    setName,
    myVideo,
    userVideo,
    connectionRef,
  } = usePeer();

  useEffect(() => {

    socket.current.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
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
  });

  const answerCall = () => {
    setCallAccepted(true);
    setInCall(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    console.log(caller);
    peer.on("signal", (data) => {
      socket.current.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  socket.current.on("callEnded", () => {
    userVideo.current.srcObject = null;
    setInCall(false);
    setCallEnded(true);
    navigate(`/`);
    window.location.reload(true);
  });

  const leaveCall = () => {
    socket.current.emit("disconnectCall");
    userVideo.current.srcObject = null;
    deleteRoom({ roomId: code });
    setInCall(false);
    setCallEnded(true);
    navigate(`/`);
    window.location.reload(true);
  };

  return (
    <div className="bg-[#EEEEEE] w-[100vw] h-[100vh] flex flex-col sm:justify-around items-center sm:flex-row">
      <div className="w-full h-[100vh] flex-col sm:rounded-lg sm:h-[100vh] sm:p-6 sm:pr-3 sm:w-[25vw] sm:min-w-[350px]">
        <div className="bg-[#222831] w-[100%] h-[100vh] flex relative flex-col justify-evenly sm:h-[95%] sm:p-4 sm:min-h-[550px] rounded-t-lg">
          <div className=" bg-[#EEEEEE] relative p-1 h-[50%] w-full border-solid border-0 border-gray-400 sm:rounded-lg sm:w-[100%] sm:h-fit">
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              style={{ height: "100%", objectFit: "cover", }}
            />
            <span className="m-2 top-1 left-1 absolute">{`You (${user.name})`}</span>
          </div>
          <div className="min-h-[150px] relative p-1 bg-[#EEEEEE] h-[50%] w-full border-solid border-0 border-gray-400 sm:rounded-lg sm:w-[100%] sm:h-fit">
            <video
              playsInline
              ref={userVideo}
              autoPlay
              style={{ objectFit: "cover", height: "100%" }}
            />
            {inCall ? <span className="absolute left-1 top-1 z-10 font-bold">{`${name}`}</span> : <span className="absolute left-1 top-1 z-10 font-bold">No user in meeting</span>}
          </div>
          {receivingCall && !callAccepted ? (
            <div className="bg-[#222831] p-2 rounded text-[#EEEEEE] z-10 absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]">
              <div className="caller">
                <h1 className="font-extrabold m-2">
                  {`${name} is calling...`}
                </h1>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={answerCall}
                >
                  Answer
                </button>
              </div>
            </div>
          ) : null}
        </div>
        <div className="bg-[#00ADB5] absolute flex bottom-1 h-fit w-[98%] flex items-center m-1 p-1 rounded-lg">
          <h1 className="mr-2 font-medium">Room Code: </h1>
          <span className="mr-2">{code}</span>

          {callAccepted ? (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              onClick={leaveCall}
            >
              End Call
            </button>
          ) : (
            <button
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm p-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={async () => {
                await navigator.clipboard.writeText(code);
              }}
            >
              {/* <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Green</button> */}
              Copy Id
            </button>
          )}
        </div>
      </div>
      <div className="bg-[#EEEEEE] flex flex-col justify-between mt-1 sm:mt-0 w-[100%] h-fit sm:p-6 sm:pl-3 sm:h-[100vh] sm:w-[75vw]">
        {loading === true ? (
          <img
            className="z-10 h-20 w-20 absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]"
            src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
            alt="loading"
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MainMobile;
