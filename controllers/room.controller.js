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
    // console.log("new room created");
    await newRoom.save();
    // console.log(newRoom);
    return response.status(200).json(newRoom);
  } catch (error) {
    // console.log("error creating new room", error);
    return response.status(203).json(error.msg);
  }
};
export const getSocketId = async (request, response) => {
  try {
    const { roomId } = request.body;
    let room = await Room.findOne({ roomId });
    return response.status(203).json(room);
  } catch (error) {
    console.log("room not found");
    response.status(202).json(error);
  }
};

export const joinRoom = async (request, response) => {
  try {
    const { roomId, joiner, joinerId } = request.body;
    let exist = await Room.findOne({ roomId });

    if (!exist) {
      console.log("Room does not exists");
      return response.status(400).json({ error: "Room does not exists" });
    } else {
      console.log("Room joined");
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
    }
  } catch (error) {
    console.log(error);
    response.status(202).json(error);
  }
};

export const getRoom = async (request, response) => {
  try {
    const { roomId } = request.body;
    console.log(roomId);
    const room = await Room.findOne({ roomId });
    console.log(room);
    response.status(201).json(room);
  } catch (error) {
    console.log("room not found");
    response.status(202).json(error);
  }
};
