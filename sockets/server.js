import { Server } from "socket.io";

const io = new Server(process.env.PORT || 9000, {
  cors: true,
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("get-me", () => {
    io.to(socket.id).emit("got-me", socket.id);
  });

  socket.on("join-room", ({ tempRoomId }) => {
    socket.join(tempRoomId);
  });

  socket.on("disconnectCall", () => {
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
