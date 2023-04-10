import axios from "axios";
// const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const REACT_APP_DEVELOPMENT_BACKEND_URL =process.env.REACT_APP_BACKEND_URL;

export const createRoom = async (data) => {
  try {
    let response = await axios.post(
      `${REACT_APP_DEVELOPMENT_BACKEND_URL}/createRoom`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const joinRoom = async (data) => {
  try {
    let response = await axios.post(
      `${REACT_APP_DEVELOPMENT_BACKEND_URL}/joinRoom`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const getRoom = async (data) => {
  try {
    console.log(data);
    let response = await axios.get(
      `${REACT_APP_DEVELOPMENT_BACKEND_URL}/getRoom`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};
export const getSocketId = async (data) => {
  try {
    let response = await axios.post(
      `${REACT_APP_DEVELOPMENT_BACKEND_URL}/getSocketId`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};
