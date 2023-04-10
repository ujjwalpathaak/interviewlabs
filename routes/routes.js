import express from "express";
import { executeCode } from "../controllers/code.controller.js";
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Importing controllers
import { addUser, loginUser } from "../controllers/user.controller.js";
import {
  getRoom,
  createRoom,
  joinRoom,
  getSocketId,
} from "../controllers/room.controller.js";

//Base get to URL
router.get("/", (req, res) => {
  res.send("API Working");
});

// User Routes
router.post("/addUser", addUser);
router.post("/loginUser", loginUser);

// Create Rooms
router.post("/createRoom", createRoom);
router.post("/joinRoom", joinRoom);
router.get("/getRoom", getRoom);
router.post("/getSocketId", getSocketId);

// Code Execute
router.post("/execute", executeCode);

export default router;
