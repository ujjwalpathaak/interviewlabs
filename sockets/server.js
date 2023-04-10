import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const userSocketMap = {};
io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("get-me", () => {
    io.to(socket.id).emit("got-me", socket.id);
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("join-room", ({ tempRoomId }) => {
    socket.join(tempRoomId);
    console.log(tempRoomId);
  });

  socket.on("disconnect", () => {
    socket.leave();
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });

  socket.on("code-change", ({ roomId, code }) => {
    socket.in(roomId).emit("code-changed", { code });
  });
  socket.on("output-change", ({ roomId, result }) => {
    socket.in(roomId).emit("output-changed", { result });
  });
});

httpServer.listen(9000, () => console.log("server is running on port 5000"));
