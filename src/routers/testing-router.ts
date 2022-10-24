import { Request, Response, Router } from "express";
import { blogs } from "../repositories/blogs-repository";
import { posts } from "../repositories/posts-repository";

export const testingRouter = Router({});

testingRouter.delete("/all-data", (req: Request, res: Response) => {
  blogs.length = 0
  posts.length = 0
  res.sendStatus(204);
});
