import { body } from "express-validator";

export const titileValidation = body('title').isString().bail().trim().isLength({min: 1, max: 30})

export const shortDescriptionValidation = body('shortDescription').isString().bail().trim().isLength({min: 1, max: 100})

export const contentValidation = body('content').isString().bail().trim().isLength({min: 1, max: 1000})

export const blogIdValidation = body('blogId').trim().isUUID()


