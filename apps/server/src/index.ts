import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { Server as SocketIOServer } from "socket.io";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use("/api", routes);

// Real-time socket setup
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`EchoGlass backend running on port ${PORT}`);
});

export default app;
