dotenv.config();
import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes/routes.js";
import Connection from "./database/connectDB.js";
// import "./socket/socket.io.js";
var PORT = process.env.PORT || 8080;

// URL -> https://interviewlabs-server.onrender.com/

// Using cors
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));

// Connecting Database
Connection();

// Declaring Routes
app.use("/", router);

// Misc
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
