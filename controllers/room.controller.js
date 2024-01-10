import Room from "../models/room.model.js";

export const createRoom = async (request, response) => {
  try {
    const { roomId, owner, ownerId } = request.body;
    const newRoom = new Room({
      roomId,
      owner,
      ownerId,
    });
    await newRoom.save();
    return response.status(200).json(newRoom);
  } catch (error) {
    return response.status(203).json(error.msg);
  }
};

export const joinRoom = async (request, response) => {
  try {
    const { roomId, joiner, joinerId } = request.body;
    let exist = await Room.findOne({ roomId });

    if (!exist) {
      return response.status(400).json({ error: "Room does not exists" });
    } else {
      const room = await Room.updateOne(
        { roomId: roomId },
        {
          $set: {
            joiner: joiner,
            joinerId: joinerId,
          },
        }
      );
      return response.status(201).json(room);
    }
  } catch (error) {
    return response.status(202).json(error);
  }
};

export const deleteRoom = async (request, response) => {
  try {
    const { roomId } = request.query;
    await Room.deleteOne({ roomId });
    return response.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    return response.status(202).json(error);
  }
};

export const getRoom = async (request, response) => {
  try {
    const { roomId } = request.query;
    const room = await Room.findOne({ roomId });
    return response.status(200).json(room);
  } catch (error) {
    return response.status(202).json(error);
  }
};
