import { createSlice } from "@reduxjs/toolkit";

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    roomId: null,
    owner: null,
    ownerId: null,
    joiner: null,
  },
  reducers: {
    createdRoom: (state, action) => {
      state.roomId = action.payload.id;
      state.owner = action.payload.owner;
      state.ownerId = action.payload.ownerId;
    },
    joinedRoom: (state, action) => {
      state.joiner = action.payload.joiner;
    },
  },
});

export const { createdRoom, joinedRoom } = roomSlice.actions;
export const selectRoom = (state) => state.user.user;
export default roomSlice.reducer;
