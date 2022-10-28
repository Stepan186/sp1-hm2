import { Request, Response, Router } from "express";
import { blogs } from "../repositories/blogs/blogs-in-memory-repository";
import { posts } from "../repositories/posts/posts-in-memory-repository";

export const testingRouter = Router({});

testingRouter.delete("/all-data", (req: Request, res: Response) => {
  blogs.length = 0
  posts.length = 0
  res.sendStatus(204);
});
