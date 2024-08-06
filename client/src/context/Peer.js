import React, {
  useState,
  useRef,
} from "react";
const PeerContext = React.createContext(null);
export const usePeer = () => React.useContext(PeerContext);

export const PeerProvider = (props) => {
  let dark = localStorage.getItem('theme') || "dark";
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [inCall, setInCall] = useState(false);
  const [darkMode, setDarkMode] = useState(dark === 'dark' ? true : false);
  const [callerName, setCallerName] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [MyName, setMyName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [mediaElement, setMediaElement] = useState(null);
  const myVideo = useRef(null);
  const userVideo = useRef(null);
  const connectionRef = useRef();

  return (
    <PeerContext.Provider
      value={{
        me,
        setInCall,
        inCall,
        setMe,
        setOtherName,
        stream,
        setStream,
        mediaElement,
        setMediaElement,
        otherName,
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
        setDarkMode,
        darkMode,
        callEnded,
        setCallEnded,
        MyName,
        setMyName,
        myVideo,
        userVideo,
        connectionRef,
      }}
    >
      {props.children}
    </PeerContext.Provider>
  );
};
