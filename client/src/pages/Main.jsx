import React, { useEffect, useCallback, useState } from "react";
import CodeEditArea from "../components/Main/CodeEditArea";
import { usePeer } from "../providers/Peer";
import ReactPlayer from "react-player";
import { useSocket } from "../providers/Socket";
const Main = () => {
  const { socket } = useSocket();
  const [mystream, setMyStream] = useState(null);
  const [otherTempStream, setOtherTempStream] = useState(null);
  const {
    peer,
    otherStream,
    sendStream,
    createOffer,
    createAnswer,
    setRemoteAnswer,
  } = usePeer();

  const handleNewUserJoined = useCallback(
    async (data) => {
      const { name } = data;
      console.log(`new user -> ${name} joined`);
      const offer = await createOffer();
      socket.emit("call-user", { name, offer });
      setOtherTempStream(name);
    },
    [createOffer, socket]
  );

  const handleIncomingCall = useCallback(
    async (data) => {
      const { from, offer } = data;
      console.log(`incomming call from -> ${from}`, offer);
      const ans = await createAnswer(offer);
      socket.emit("call-accepted", { name: from, ans });
      setOtherTempStream(from);
    },
    [createAnswer, socket, setOtherTempStream]
  );

  const handleCallAccepted = useCallback(
    async (data) => {
      const { ans } = data;
      console.log("got accepted", ans);
      await setRemoteAnswer(ans);
    },
    [setRemoteAnswer]
  );

  const getUserMediaStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
    sendStream(stream);
  }, [sendStream]);

  useEffect(() => {
    getUserMediaStream();
  }, [getUserMediaStream]);

  useEffect(() => {
    socket.on("user-joined", handleNewUserJoined);
    socket.on("incomming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);

    return () => {
      socket.off("user-joined", handleNewUserJoined);
      socket.off("incomming-call", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
    };
  }, [handleNewUserJoined, handleIncomingCall, handleCallAccepted, socket]);

  const handleNegosiation = useCallback(() => {
    const tempOffer = peer.localDescription;
    socket.emit("call-user", { name: otherTempStream, offer: tempOffer });
  }, [peer.localDescription, otherTempStream]);

  useEffect(() => {
    peer.addEventListener("negotiationneeded", handleNegosiation);
    return () => {
      peer.removeEventListener("negotiationneeded", handleNegosiation);
    };
  }, [handleNegosiation, socket]);

  return (
    <div className="bg-[#EEEEEE] w-[100vw] h-[100vh] flex flex-col sm:justify-around items-center sm:p-2 sm:flex-row">
      {/* <JoinRoomPage /> */}
      <div className="w-full h-[30vh] flex-col sm:rounded-lg sm:h-[95vh] sm:mr-2 sm:w-[24vw] sm:min-w-[350px]">
        <div className="bg-[#393E46] w-[100%] h-full flex flex-row justify-start sm:h-[90%] sm:flex-col sm:p-4 sm:min-h-[550px]">
          <div className="min-h-[250px] bg-[#EEEEEE] h-full w-[50%] border-solid border-2 border-gray-400 sm:rounded-lg sm:w-[100%] sm:h-[45%] sm:mb-4">
            <ReactPlayer
              url={mystream}
              width="100%"
              height="100%"
              playing
              muted
            />
          </div>
          <div className="min-h-[250px] bg-[#EEEEEE] h-full w-[50%] border-solid border-2 border-gray-400 sm:rounded-lg sm:w-[100%] sm:h-[45%]">
            <ReactPlayer
              // className="h-full w-full"
              url={otherStream}
              width="100%"
              height="100%"
              playing
            />
          </div>
        </div>
        <div className="bg-[#00ADB5] h-[5%] w-[100%] flex items-center p-2">
          <h1 className="mr-2 font-medium">Room Code: </h1>
          <span className="mr-2">234-234-234</span>
          <button className="bg-[#EEEEEE] hover:bg-[#e9e8e8] hover:border-black hover:border-2  text-[#222831] font-bold h-fit w-fit p-1 pr-2 pl-2 rounded-full">
            Copy
          </button>
        </div>
      </div>
      <div className="bg-[#EEEEEE] flex flex-col justify-between mt-6 sm:mt-0 w-[100%] h-[60vh] sm:h-[95vh] sm:w-[74vw]">
        <CodeEditArea />
      </div>
    </div>
  );
};

export default Main;
