import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../context/userSlice";
import roomReducer from "../context/roomSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer
  },
});