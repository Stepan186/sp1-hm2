import { Request, Response, Router } from "express";
import {
  inputValidatorMiddleware,
  nameValidator,
  youtubeUrlValidator
} from "../middlewares/blogs-middleware";
import { authMiddleware } from "../middlewares/auth-middleware";
import { blogsRepository } from "../repositories/blogs/blogs-db-repository";

export const blogsRouter = Router({});

blogsRouter.get("/", async (req: Request, res: Response) => {
  const blogs = await blogsRepository.findBlogs();
  res.send(blogs);
});

blogsRouter.get("/:id", async (req: Request, res: Response) => {

  const blog = await blogsRepository.findBlogById(req.params.id);

  if (blog) {
    res.send(blog);
  } else {
    res.send(404);
  }

});

blogsRouter.post("/", authMiddleware, nameValidator, youtubeUrlValidator, inputValidatorMiddleware, async (req: Request, res: Response) => {
  const data = req.body;
  const newBlog = await blogsRepository.createBlog(data);
  res.status(201).send(newBlog);
});

blogsRouter.put("/:id", authMiddleware, nameValidator, youtubeUrlValidator, inputValidatorMiddleware, async (req: Request, res: Response) => {
  const data = req.body;
  const isUpdated = await blogsRepository.updateBlog(req.params.id, data);
  if (isUpdated) {
    res.send(204);
  } else {
    res.send(404);
  }
});

blogsRouter.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  const isDeleted = await blogsRepository.deleteBlog(req.params.id);
  if (isDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
});

