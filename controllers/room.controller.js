import Room from "../models/room.model.js";
import bcrypt from "bcryptjs";

export const createRoom = async (request, response) => {
  try {
    const { roomId, owner, ownerId } = request.body;

    const newRoom = new Room({
      roomId,
      owner,
      ownerId,
    });
    await newRoom.save();
    console.log("new room created");
    return response.status(200).json(newRoom);
  } catch (error) {
    console.log("error creating new room", error);
    return response.status(203).json(error.msg);
  }
};

export const joinRoom = async (request, response) => {
  try {
    const { roomId, joiner, joinerId } = request.body;
    const room = await Room.updateOne(
      { roomId: roomId },
      {
        $set: {
          joiner: joiner,
          joinerId: joinerId,
        },
      }
    );
    response.status(201).json(room);
  } catch (error) {
    console.log(error);
    response.status(202).json(error);
  }
};

export const getRoom = async (request, response) => {
  try {
    const { roomId } = request.body;
    const room = await Room.findOne({ roomId: roomId });
    // console.log(room)
    response.status(201).json(room);
  } catch (error) {
    console.log("room not found");
    response.status(202).json(error);
  }
};
