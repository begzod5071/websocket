import express from "express";

import userRouter from "./userRouter";
import conversationRouter from "./conversationRouter";

const router = express.Router();

router.use("/", userRouter);
router.use("/", conversationRouter);

export default router;
