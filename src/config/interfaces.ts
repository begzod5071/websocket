import { Response, Request } from "express";
import { WebSocket } from "ws";

export interface IData {
  senderId: number | string;
  receiverId: number | string;
  content: object;
  type: string | number;
}

export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  password: string;
  username: string;
  joined_at: string;
}

export interface IWebSocket extends WebSocket {
  userId: number | string;
}

export interface IResponse extends Response {
  error?: any;
}

export interface IRequest extends Request {
  files?: any;
  user?: any;
  isAllowed?: boolean;
  role?: string;
}
