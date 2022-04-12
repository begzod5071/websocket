import express from "express";

import conversationCtrl from "../controllers/conversationCtrl";

const router = express.Router();

router.post("/conversation", conversationCtrl.create);

// id of user should be
router.get("/conversation/:id", conversationCtrl.getConversation);

export default router;
