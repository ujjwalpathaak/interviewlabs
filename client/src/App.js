import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUser } from "./provider/userSlice";
import Homepage from "./pages/Homepage";
import Main from "./pages/Main";
import JoinRoomPage from "./components/Main/JoinRoomPage";

import "./App.css";
import MainMobile from "./pages/MainMobile";

function App() {
  const user = useSelector(selectUser);

  const [code, setCode] = useState();

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  useEffect(() => {
    /* Inside of a "useEffect" hook add an event listener that updates
         the "width" state variable when the window size changes */
    window.addEventListener("resize", () => setWidth(window.innerWidth));

    /* passing an empty array as the dependencies of the effect will cause this
         effect to only run when the component mounts, and not each time it updates.
         We only want the listener to be added once */
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/joinroom"
          element={user ? <JoinRoomPage setCode={setCode} /> : <Homepage />}
        />
        <Route
          path="/room/:roomId"
          element={
            width < breakpoint ? (
              <MainMobile code={code} mobile={"mobile"} />
            ) : (
              <Main code={code} />
            )
          }
        />
        <Route path="*" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
