import { Server } from "socket.io";
const io = new Server();

// MAPS 
const emailToSocketMapping = new Map();


io.on("connection", (socket) => {
  // join-room -> function
  socket.on("join-room", (data) => {
    // asking for data
    const { roomId, name } = data;
     console.log("user ", name, "join room", roomId);
    nameToSocketMapping.set(name, socket.id);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-joined", { name });
  });
});

io.listen(8081, () => {console.log("Socket server running on 8081")});
 