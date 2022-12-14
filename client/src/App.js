// import { useState } from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import { Provider, useSelector } from "react-redux";
import store from "./app/store";
import { selectUser } from "./context/userSlice";
import Main from "./pages/Main";
function App() {
  const user = useSelector(selectUser);
  return (
    <Provider store={store}>
      <div className="App">{user ? <Main /> : <Homepage />}</div>
    </Provider>
  );
}

export default App;
