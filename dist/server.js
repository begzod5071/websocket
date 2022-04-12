"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var index_1 = __importDefault(require("./routes/index"));
var ws_1 = __importDefault(require("ws"));
var errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
var wss = new ws_1.default.Server({ server: server });
var clients = [];
function broadcastNewMessage(userId, data) {
    clients.forEach(function (client) {
        if (client.userId === data.receiverId &&
            client.readyState === ws_1.default.OPEN) {
            client.send(JSON.stringify({
                event: "getMessage",
                data: {
                    senderId: userId,
                    content: data.content,
                },
            }));
        }
    });
}
function broadcastNotification(userId, data) {
    clients.forEach(function (client) {
        if (client.userId === data.receiverId &&
            client.readyState === ws_1.default.OPEN) {
            client.send(JSON.stringify({
                event: "getNotification",
                senderId: userId,
                type: data.type,
            }));
        }
    });
}
wss.on("connection", function (ws) {
    console.log("Connected");
    console.log(clients);
    ws.on("message", function (message) {
        try {
            var _a = JSON.parse(message.toString()), event_1 = _a.event, data = _a.data;
            switch (event_1) {
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
        }
        catch (err) { }
    });
    ws.on("close", function () {
        console.log("Disconnected");
    });
});
// Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// Errors handler
app.use(errorHandler_1.default);
// Routes
app.use("/api", index_1.default);
// Listening
var PORT = process.env.PORT || 6000;
server.listen(PORT, function () { return console.log("Server started on th port ".concat(PORT)); });
