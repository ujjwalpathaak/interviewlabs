import express from "express";
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Importing controllers
import { addUser, loginUser } from "../controllers/user.controller.js";

//Base get to URL
router.get("/", (req, res) => {
  res.send("API Working");
});

// User Routes
router.post("/addUser", addUser);
router.post("/loginUser", loginUser);

export default router;
