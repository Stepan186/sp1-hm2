import { body } from "express-validator";
import { blogsRepository } from "../repositories/blogs/blogs-db-repository";

export const titileValidation = body("title").isString().bail().trim().isLength({ min: 1, max: 30 });

export const shortDescriptionValidation = body("shortDescription").isString().bail().trim().isLength({
  min: 1,
  max: 100
});

export const contentValidation = body("content").isString().bail().trim().isLength({ min: 1, max: 1000 });

export const blogIdValidation = body("blogId").custom(async (value, { req }) => {
  if (!await blogsRepository.findBlogById(value)) {
    throw new Error("bloId does not exist");
  } else {
    return true;
  }
});


