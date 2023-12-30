import React, { createContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext(null);


const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

const SocketProvider = ({ children }) => {
  const socket = useRef();
  useEffect(() => {
    socket.current = io.connect(`${SOCKET_URL}`);
    // socket.current = io.connect(`${SOCKET_URL}`);
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
