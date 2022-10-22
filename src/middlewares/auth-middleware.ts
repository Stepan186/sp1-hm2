import { NextFunction, Request, Response } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const authorization = req.header('authorization')
  if (authorization) {
    next()
  } else {
    res.sendStatus(401)
  }
}
