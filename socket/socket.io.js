import { Server } from "socket.io";
const io = new Server();

io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    const { roomId, name } = data;
    console.log("user", name, "join room", roomId);
    nameToSocketMapping.set(name, socket.id);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-joined", { name });
  });
});

io.listen(8081);
