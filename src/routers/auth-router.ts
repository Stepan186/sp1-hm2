import { Request, Response, Router } from 'express';
import { authServices } from '../services/auth-services';

export const authRouter = Router({})

authRouter.post('/login', async (req: Request, res: Response) => {
  const data = req.body
  const result = await authServices.login(data)

  if (result) {
    res.sendStatus(204)
    return
  }
  res.sendStatus(401)
})
