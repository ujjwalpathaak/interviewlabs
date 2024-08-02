import React from "react";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUser } from "./provider/userSlice";
import Homepage from "./pages/Homepage";
import JoinRoomPage from "./components/Main/JoinRoomPage";

import "./App.css";

import MobileBgDark from './assets/mobile_bg_dark.svg';
import MobileBgLight from './assets/mobile_bg_light.svg';
import BgDark from './assets/bg_dark.svg';
import BgLight from './assets/bg_light.svg';

const Main = React.lazy(() => import('./pages/Main'));
const MainMobile = React.lazy(() => import('./pages/MainMobile'));

function App() {
  const user = useSelector(selectUser);
  const [code, setCode] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  useEffect(() => {
    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };

    const handleResize = () => setWidth(window.innerWidth);
    const debouncedHandleResize = debounce(handleResize, 200);

    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              {width < breakpoint + 330 ? (
                <Homepage bg_dark={MobileBgDark} bg_light={MobileBgLight} />
              ) : (
                <Homepage bg_dark={BgDark} bg_light={BgLight} />
              )}
            </React.Suspense>
          } />
        <Route
          path="/joinroom"
          element={user ? <JoinRoomPage setCode={setCode} /> : <Navigate to="/" />}
        />
        <Route
          path="/room/:roomId"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              {width < breakpoint ? (
                <MainMobile code={code} mobile={"mobile"} bg_dark={MobileBgDark} bg_light={MobileBgLight} />
              ) : (
                <Main code={code} bg_dark={BgDark} bg_light={BgLight} />
              )}
            </React.Suspense>
          }
        />
        <Route path="*" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
