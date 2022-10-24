import { body } from "express-validator";

export const titileValidation = body('title').trim().isString().isLength({min: 1, max: 30})

export const shortDescriptionValidation = body('shortDescription').trim().isString().isLength({min: 1, max: 100})

export const contentValidation = body('content').trim().isString().isLength({min: 1, max: 1000})

export const blogIdValidation = body('blogId').trim().isUUID()


