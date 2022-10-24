import { body } from "express-validator";
import { blogsRepository } from "../repositories/blogs-repository";

export const titileValidation = body('title').isString().bail().trim().isLength({min: 1, max: 30})

export const shortDescriptionValidation = body('shortDescription').isString().bail().trim().isLength({min: 1, max: 100})

export const contentValidation = body('content').isString().bail().trim().isLength({min: 1, max: 1000})

export const blogIdValidation = body('blogId').trim().isUUID().custom((value, {req}) => {
  if (!blogsRepository.findBlogById(value)) {
    throw new Error('bloId does not exist')
  } else {
    return true
  }
})


