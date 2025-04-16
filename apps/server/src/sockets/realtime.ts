import { Server } from "socket.io";

export function setupRealtime(io: Server) {
  io.on("connection", (socket) => {
    console.log("Socket connected (realtime):", socket.id);
    // Add real-time event handlers here
    socket.on("disconnect", () => {
      console.log("Socket disconnected (realtime):", socket.id);
    });
  });
}
