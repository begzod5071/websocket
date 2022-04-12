import { IRequest, IResponse } from "../config/interfaces";
import query from "../models/query";
import { row, rows } from "../database/pg";

const conversationCtrl = {
  create: async (req: IRequest, res: IResponse) => {
    try {
      const { senderId, recieverId } = req.body;

      if (!senderId || !recieverId) return res.error.dataNotEnough(res);

      const newConversation = await row(
        query.NEW_CONVERSATION,
        senderId,
        recieverId
      );

      res.status(201).json({
        message: "Conversation created",
      });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },

  getConversation: async (req: IRequest, res: IResponse) => {
    try {
      const { id } = req.params;

      if (!id) return res.error.dataNotEnough(res);

      const conversations = await rows(query.GET_CONVERSATION, id);

      res.status(200).json(conversations)
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },

};

export default conversationCtrl;
