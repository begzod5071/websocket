"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var messageCtrl_1 = __importDefault(require("../controllers/messageCtrl"));
var router = express_1.default.Router();
router.post("/message", messageCtrl_1.default.createMessage);
// id of conversation should be
router.get("/message/:id", messageCtrl_1.default.getMessage);
router.put("/message/read", messageCtrl_1.default.readMessage);
exports.default = router;
