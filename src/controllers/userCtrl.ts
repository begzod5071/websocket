// import { Request, Response } from "express";
import { IRequest, IResponse } from "../config/interfaces";
import query from "../models/query";
import { row, rows } from "../database/pg";

const userCtrl = {
  signUp: async (req: IRequest, res: IResponse) => {
    try {
      const { firstname, lastname, username, password } = req.body;

      if (!firstname || !lastname || !password || !username)
        return res.error.dataNotEnough(res);

      const checkUser = await row(query.CHECK_USERNAME, username);
      if (checkUser) return res.error.userExist(res);

      const newUser = await row(
        query.SIGNUP,
        firstname,
        lastname,
        password,
        username
      );

      res.status(201).json({
        message: "User created",
      });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },

  login: async (req: IRequest, res: IResponse) => {
    try {
      const { username, password } = req.body;

      const user = await row(query.LOGIN, username, password);

      if (user) {
        res.status(200).json(user);
      } else {
        return res.error.userNotFound(res);
      }
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
};

export default userCtrl;
