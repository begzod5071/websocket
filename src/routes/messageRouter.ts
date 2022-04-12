import express from "express";

import MessageCtrl from "../controllers/messageCtrl";

const router = express.Router();

router.post("/message", MessageCtrl.createMessage);

// id of conversation should be
router.get("/message/:id", MessageCtrl.getMessage);

router.put("/message/read", MessageCtrl.readMessage);

export default router;
