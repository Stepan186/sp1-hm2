import { NextFunction, Request, Response } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const authorization = req.header('authorization')?.split(' ')
  const validAuth = btoa('admin' + ":" + 'qwerty')



  if (authorization && authorization[1] === validAuth) {
   next()
  } else {
    res.sendStatus(401)
  }
}
