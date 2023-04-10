import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import store from "./app/store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import SocketProvider from "./context/Socket";
import { PeerProvider } from "./context/Peer";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <SocketProvider>
        <PeerProvider>
          <App />
        </PeerProvider>
      </SocketProvider>
    </Provider>
  </BrowserRouter>
);
