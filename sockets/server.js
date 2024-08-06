import { Server } from "socket.io";
import fs from "fs";
import { fileURLToPath } from "url";

import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFile = path.join(__dirname, 'server.log');
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

const log = (message) => {
  const timestamp = new Date().toISOString();
  logStream.write(`[${timestamp}] ${message}\n`);
};

const io = new Server(process.env.PORT || 9000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

log(`Socket.io server running on port ${process.env.PORT || 9000}`);

io.on("connection", (socket) => {
  log(`New client connected: ${socket.id}`);
  
  socket.emit("me", socket.id);

  socket.on("get-me", () => {
    log(`Client requested their ID: ${socket.id}`);
    io.to(socket.id).emit("got-me", socket.id);
  });

  socket.on("try-join-room", ({ tempRoomId }) => {
    const room = io.sockets.adapter.rooms.get(tempRoomId);
    log(`Client ${socket.id} trying to join room ${tempRoomId}`);
    
    if (room && room.size >= 2) {
      log(`Room ${tempRoomId} is full`);
      socket.emit("room-error", { message: "Room is full" });
    } else {
      socket.join(tempRoomId);
      log(`Client ${socket.id} joined room ${tempRoomId}`);
      socket.emit("room-joined", { message: "Calling User..." });
    }
  });

  socket.on("create-new-room", ({ tempRoomId }) => {
    const room = io.sockets.adapter.rooms.get(tempRoomId);
    log(`Client ${socket.id} trying to create room ${tempRoomId}`);
    
    if (room && room.size >= 2) {
      log(`Error creating room ${tempRoomId}`);
      socket.emit("room-create-error", { message: "Error creating room" });
    } else {
      socket.join(tempRoomId);
      log(`Client ${socket.id} created room ${tempRoomId}`);
      socket.emit("room-created", { message: "Calling User..." });
    }
  });

  socket.on("leave-call", (data) => {
    log(`Client ${socket.id} is leaving call ${data.roomId}`);
    socket.in(data.roomId).emit("user-left");
    socket.leave();
  });

  socket.on("call-user", (data) => {
    log(`Client ${data.from} is calling user ${data.userToCall}`);
    io.to(data.userToCall).emit("incoming-call", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("code-sent-to-process", (data) =>{
    log(`Code sent to process in room ${data.roomId}`);
    io.to(data.roomId).emit("output-sent-to-process", { code: data.code });
  })

  socket.on("answer-incoming-call", (data) => {
    log(`Answering call from ${data.from} to ${data.to}`);
    io.to(data.to).emit("call-accepted", {signal:data, name: data.name_from, stream: data.stream});
  });

  socket.on("code-change", ({ roomId, code }) => {
    log(`Code change in room ${roomId}`);
    socket.in(roomId).emit("code-changed", { code });
  });

  socket.on("output-change", ({ roomId, result }) => {
    log(`Output change in room ${roomId}`);
    socket.in(roomId).emit("output-changed", { result });
  });
  
  socket.on("disconnect", () => {
    log(`Client disconnected: ${socket.id}`);
    const rooms = Array.from(socket.rooms);
    rooms.forEach((room) => {
      if (room !== socket.id) {
        socket.leave(room);
        const remainingRoom = io.sockets.adapter.rooms.get(room);
        if (!remainingRoom || remainingRoom.size === 0) {
          socket.broadcast.to(room).emit("callEnded");
        }
      }
    });
  });
});