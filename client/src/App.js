// import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { Provider, useSelector } from "react-redux";
import store from "./app/store";
import { selectUser } from "./context/userSlice";
import Main from "./pages/Main";
import JoinRoomPage from "./components/Main/JoinRoomPage";
function App() {
  const user = useSelector(selectUser);
  return (
    <Provider store={store}>
      {/* <JoinRoomPage /> */}

      <div className="App">
        <Routes>
          <Route path="/" element={user ? <JoinRoomPage /> : <Homepage />} />
          <Route path="/room/:roomId" element={<Main />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
