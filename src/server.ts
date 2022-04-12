import dotenv from "dotenv";
import http from "http";
import express, { Request } from "express";
import cors from "cors";
import routes from "./routes/index";
import WebSocket from "ws";
import errorHandler from "./middlewares/errorHandler";
import { IWebSocket, IData } from "./config/interfaces";

dotenv.config();

const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server<IWebSocket>({ server });

const clients: Array<IWebSocket> = [];

function broadcastNewMessage(userId: number | string, data: IData) {
  clients.forEach((client) => {
    if (
      client.userId === data.receiverId &&
      client.readyState === WebSocket.OPEN
    ) {
      client.send(
        JSON.stringify({
          event: "getMessage",
          data: {
            senderId: userId,
            content: data.content,
          },
        })
      );
    }
  });
}

function broadcastNotification(userId: number | string, data: IData) {
  clients.forEach((client) => {
    if (
      client.userId === data.receiverId &&
      client.readyState === WebSocket.OPEN
    ) {
      client.send(
        JSON.stringify({
          event: "getNotification",
          senderId: userId,
          type: data.type,
        })
      );
    }
  });
}

wss.on("connection", function (ws) {
  console.log("Connected");
  console.log(clients);

  ws.on("message", function (message) {
    try {
      const { event, data } = JSON.parse(message.toString());
      switch (event) {
        case "addUser": {
          ws.userId = JSON.parse(data).userId;
          clients.push(ws);
          console.log(clients);

          break;
        }
        case "sendMessage": {
          broadcastNewMessage(ws.userId, JSON.parse(data));
          break;
        }
        case "sendNotification": {
          broadcastNotification(ws.userId, JSON.parse(data));
        }
      }
    } catch (err) {}
  });

  ws.on("close", function () {
    console.log("Disconnected");

  });
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Errors handler
app.use(errorHandler);

// Routes
app.use("/api", routes);

// Listening
const PORT = process.env.PORT || 6000;
server.listen(PORT, () => console.log(`Server started on th port ${PORT}`));
