import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const nameValidator = body('name').trim().isString().isLength({min: 1, max: 15}).withMessage({
  "message": "name must be a sting and max length 15",
  "field": "name"
})
export const youtubeUrlValidator = body('youtubeUrl').trim().isString().isLength({max: 100, min: 1}).withMessage({
  "message": "youtubeUrl must be a sting and max length 100",
  "field": "youtubeUrl"
})

export const inputValidatorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req)
  if (!error.isEmpty()) {
    res.status(400).json({errorsMessages: error.array()})
    return
  } else {
    next()
  }
}
