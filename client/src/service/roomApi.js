import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const createRoom = async (data) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/createRoom`, data);
    return response.data;
  } catch (err) {
    console.error(`Error creating room: ${err.message}`);
    throw err;
  }
};

export const joinRoomAPI = async (data) => {
  try {
    const response = await axios.put(`${BACKEND_URL}/joinRoom`, data);
    return response.data;
  } catch (err) {
    console.error(`Error joining room: ${err.message}`);
    throw err;
  }
};

export const deleteRoom = async (data) => {
  try {
    await axios.delete(`${BACKEND_URL}/deleteRoom`, { params: { roomId: data.roomId } });
  } catch (err) {
    console.error(`Error deleting room: ${err.message}`);
    throw err;
  }
};

export const getRoom = async (data) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/getRoom`, { params: { roomId: data.roomId } });
    return response.data;
  } catch (err) {
    console.error(`Error fetching room: ${err.message}`);
    throw err;
  }
};

export const signIn = async (data) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/loginUser`, data);
    return response;
  } catch (err) {
    console.error(`Error signing in: ${err.message}`);
    throw err;
  }
}

export const signUp = async (data) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/addUser`, data);
    return response;
  } catch (err) {
    console.error(`Error signing up: ${err.message}`);
    throw err;
  }
}
