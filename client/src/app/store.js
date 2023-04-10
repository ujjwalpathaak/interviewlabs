import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../provider/userSlice";
import roomReducer from "../provider/roomSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
  },
});

export default store;
