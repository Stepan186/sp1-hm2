import { NextFunction, Request, Response } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const authorization = req.header('authorization')
  const validAuth = btoa('admin' + ":" + 'qwerty')



  if (authorization && ('Basic' + ' ' + authorization === validAuth)) {
   next()
  } else {
    res.sendStatus(401)
  }
}
