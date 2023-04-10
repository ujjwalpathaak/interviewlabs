import mongoose from "mongoose";

// Defining room schema
const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    joiner: {
      type: String,
    },
    joinerId: {
      type: String,
    },
    joinerSocketId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("room", roomSchema);
export default Room;
