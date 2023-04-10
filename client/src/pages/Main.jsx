import React, { useEffect, useCallback, useState, useContext } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

import CodeEditArea from "../components/Main/CodeEditArea";
import { usePeer } from "../context/Peer";
import { SocketContext } from "../context/Socket";
import { selectUser } from "../provider/userSlice";
import Peer from "simple-peer";
import { useNavigate } from "react-router-dom";

const Main = ({ code }) => {
  const { socket } = useContext(SocketContext);
  const [loading, setLoading] = useState(false);
  const [inCall, setInCall] = useState(false);
  const user = useSelector(selectUser);
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
    callerSignal,
    callerName,
    setCallerName,
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
    socket.current.on("callEnded", (data) => {
      userVideo.current.srcObject = null;
      console.log("callended");
    });
    socket.current.on("callUser", (data) => {
      console.log("call incomming", data.from);
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        console.log(stream);
        setStream(stream);
        // setVid(stream);
        myVideo.current.srcObject = stream;
      });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);
    console.log("call picked up");
    setInCall(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.current.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    userVideo.current.srcObject = null;
    setInCall(false);
    navigate(`/joinroom`);
    connectionRef.current.destroy();
  };

  return (
    <div className="bg-[#EEEEEE] w-[100vw] h-[100vh] flex flex-col sm:justify-around items-center sm:flex-row">
      <div className="w-full h-[30vh] flex-col sm:rounded-lg sm:h-[100vh] sm:p-6 sm:pr-3 sm:w-[25vw] sm:min-w-[350px]">
        <div className="bg-[#393E46] w-[100%] h-full flex flex-row justify-evenly sm:h-[95%] sm:flex-col sm:p-4 sm:min-h-[550px] rounded-t-lg">
          <div className="min-h-[250px] bg-[#EEEEEE] h-full w-[50%] border-solid border-2 border-gray-400 sm:rounded-lg sm:w-[100%] sm:h-fit">
            
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              style={{ width: "100%" }}
            />
          </div>
          <div className="min-h-[250px] bg-[#EEEEEE] h-fit w-[50%] border-solid border-2 border-gray-400 sm:rounded-lg sm:w-[100%] sm:h-fit">
            <video
              playsInline
              ref={userVideo}
              autoPlay
              style={{ width: "100%" }}
            />
          </div>
          <div className="z-10">
            {receivingCall && !callAccepted ? (
              <div className="caller">
                <h1 className="text-white font-extrabold m-2">
                  {/* {callerName ? callerName : "unknown"}  */}
                  {/* is calling... */}
                </h1>
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={answerCall}
                >
                  Answer
                </button>
              </div>
            ) : null}
            {callAccepted && !callEnded ? (
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={leaveCall}
              >
                End Call
              </button>
            ) : null}
          </div>
        </div>
        <div className="bg-[#00ADB5] h-[5%] w-[100%] flex items-center p-2 rounded-b-lg">
          <h1 className="mr-2 font-medium">Room Code: </h1>
          <span className="mr-2">{code}</span>
          <button
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm p-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={async () => {
              await navigator.clipboard.writeText(code);
            }}
          >
            {/* <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Green</button> */}
            Copy Id
          </button>
        </div>
      </div>
      <div className="bg-[#EEEEEE] flex flex-col justify-between mt-6 sm:mt-0 w-[100%] h-[60vh] sm:p-6 sm:pl-3 sm:h-[100vh] sm:w-[75vw]">
        {loading == true ? (
          <img
            className="z-10 h-20 w-20 absolute top-1/2 left-1/2 "
            src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
          />
        ) : (
          <></>
        )}
        <CodeEditArea code={code} loading={loading} setLoading={setLoading} />
      </div>
    </div>
  );
};

export default Main;
