dotenv.config();
import dotenv from "dotenv";
import express from "express";
const app = express();

import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/routes.js";
import Connection from "./database/connectDB.js";

var PORT = process.env.PORT || 8080;

app.use(cors());

Connection();

app.use("/", router);

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
