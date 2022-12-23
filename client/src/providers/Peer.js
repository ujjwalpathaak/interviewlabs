import React, { useMemo, useState, useEffect, useCallback } from "react";
const PeerContext = React.createContext(null);
export const usePeer = () => React.useContext(PeerContext);
export const PeerProvider = (props) => {

  const [otherStream, setOtherStream] = useState(null);

  const peer = useMemo(
    () =>
      new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      }),
    []
  );

  const handleTrackEvent = useCallback((e) => {
    const streams = e.streams;
    setOtherStream(streams[0]);
  }, []);

  useEffect(() => {
    peer.addEventListener("track", handleTrackEvent);
    return () => {
      peer.removeEventListener("track", handleTrackEvent);
    };
  }, [handleTrackEvent, peer]);

  const createOffer = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  };

  const createAnswer = async (offer) => {
    await peer.setRemoteDescription(offer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  };

  const setRemoteAnswer = async (ans) => {
    await peer.setRemoteDescription(ans);
  };

  const sendStream = async (stream) => {
    const tracks = stream.getTracks();
    for (const track of tracks) {
      peer.addTrack(track, stream);
    }
  };

  return (
    <PeerContext.Provider
      value={{
        peer,
        createOffer,
        otherStream,
        createAnswer,
        setRemoteAnswer,
        sendStream,
      }}
    >
      {props.children}
    </PeerContext.Provider>
  );
};
