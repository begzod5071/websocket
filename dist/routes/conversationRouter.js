"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var conversationCtrl_1 = __importDefault(require("../controllers/conversationCtrl"));
var router = express_1.default.Router();
router.post("/conversation", conversationCtrl_1.default.create);
// id of user should be
router.get("/conversation/:id", conversationCtrl_1.default.getConversation);
exports.default = router;
