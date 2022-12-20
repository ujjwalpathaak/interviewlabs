import { createSlice } from "@reduxjs/toolkit";
export const roomSlice = createSlice({
  name: "room",
  initialState: {
    host: null,
    guest: null,
  },
  reducers: {
    createRoom: (state, action) => {
      state.host = action.payload;
    },
    joinRoom: (state, action) => {
      state.guest = action.payload;
    },
  },
});

export const { createRoom, joinRoom } = roomSlice.actions;
// export const selectUser = (state) => state.user.user;
export default roomSlice.reducer;
