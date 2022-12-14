import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../context/userSlice";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
