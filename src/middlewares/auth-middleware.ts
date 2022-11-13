import { NextFunction, Request, Response } from "express";
import { body } from 'express-validator';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const authorization = req.header("authorization");
  const validAuth = "Basic" + " " + btoa("admin" + ":" + "qwerty");

  if (authorization && (authorization === validAuth)) {
    next();
  } else {
    res.sendStatus(401);
  }
};

export const authLoginValidator =  body('login').isString()
export const authPasswordValidator = body('password').isString()
