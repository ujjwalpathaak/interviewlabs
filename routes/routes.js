import express from "express";
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

import { executeCode } from "../controllers/code.controller.js";
import { addUser, loginUser } from "../controllers/user.controller.js";
import {
  createRoom,
  joinRoom,
  getRoom,
  deleteRoom,
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
router.put("/joinRoom", joinRoom);
router.get("/getRoom", getRoom);
router.delete("/deleteRoom", deleteRoom);

export default router;
