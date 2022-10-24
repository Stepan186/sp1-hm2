import { NextFunction, Request, Response } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const authorization = req.header("authorization");
  const validAuth = "Basic" + " " + btoa("admin" + ":" + "qwerty");
  // const validAuth = "Basic" + " " + btoa( + ":" + 'qwerty')

  if (authorization && (authorization === validAuth)) {
    next();
  } else {
    res.sendStatus(401);
  }
};
