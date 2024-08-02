import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./app/store";
import SocketProvider from "./context/Socket";
import { PeerProvider } from "./context/Peer";

import "./index.css";

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
