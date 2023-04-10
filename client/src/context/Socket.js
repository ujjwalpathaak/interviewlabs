import React, { createContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);

const SOCKET_URL = "https://interviewlabs-socket.onrender.com";

const SocketProvider = ({ children }) => {
  const socket = useRef();
  useEffect(() => {
    // socket.current = io(`${SOCKET_URL}`);
    socket.current = io.connect("https://interviewlabs-socket.onrender.com");
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
