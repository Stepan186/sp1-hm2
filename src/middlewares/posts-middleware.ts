import { body } from "express-validator";

export const titileValidation = body('title').trim().isString().isLength({min: 1, max: 30}).withMessage(
  {
  "message": "title must be a sting and length from 1 to 30",
  "field": "name"
  }
  )
export const shortDescriptionValidation = body('shortDescription').trim().isString().isLength({min: 1, max: 100}).withMessage({
  "message": "shortDescription must be a sting and length from 1 to 100",
  "field": "shortDescription"

})
export const contentValidation = body('content').trim().isString().isLength({min: 1, max: 1000}).withMessage({
  "message": "content must be a sting and length from 1 to 1000",
  "field": "content"

})
export const blogIdValidation = body('blogId').trim().isUUID().withMessage({
  "message": "blogId must be a uuid",
  "field": "blogId"
})


