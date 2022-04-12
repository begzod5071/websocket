import { IRequest, IResponse } from "../config/interfaces";
import query from "../models/query";
import { row, rows } from "../database/pg";


const messageCtrl = {
  createMessage: async (req: IRequest, res: IResponse) => {
    try {
      const {content, senderId, conversationId} = req.body;

      if (!content || !senderId || !conversationId) return res.error.dataNotEnough(res);

      const newMessage = row(query.NEW_MESSAGE, content, senderId, conversationId)

      res.status(201).json({
        message: "Message created"
      })


    } catch (err) {
      return res.error.handleError(res, err);
    }
  },

  getMessage: async (req: IRequest, res: IResponse) => {

    try {
      const {id} = req.params

      if (!id) return res.error.dataNotEnough(res);

      const messages = await rows(query.GET_MESSAGES, id)

      res.status(200).json(messages)

    } catch (err) {
      return res.error.handleError(res, err);
    }
  },

  readMessage: async (req: IRequest, res: IResponse) => {
    try {
      const {senderId, messageId} = req.body

      if (!senderId || !messageId) return res.error.dataNotEnough(res);

      const updateMessage = row(query.READ_MESSAGE, senderId, messageId)

      res.status(200).json({
        message: "Message updated"
      })

    } catch (err) {
      return res.error.handleError(res, err);
    }
  }
};

export default messageCtrl;
