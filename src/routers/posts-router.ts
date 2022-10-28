import { Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import {
  blogIdValidation,
  contentValidation,
  shortDescriptionValidation,
  titileValidation
} from "../middlewares/posts-middleware";
import { inputValidatorMiddleware } from "../middlewares/blogs-middleware";
import { postsRepository } from "../repositories/posts/posts-db-repository";

export const postsRouter = Router({});

postsRouter.get("/", async(req: Request, res: Response) => {
  const posts = await postsRepository.findPosts();
  res.send(posts);
});

postsRouter.get("/:id", async (req: Request, res: Response) => {
  const post = await postsRepository.findPostById(req.params.id);

  if (post) {
    res.send(post);
  } else {
    res.sendStatus(404);
  }
});

postsRouter.post("/", authMiddleware, titileValidation,
  shortDescriptionValidation, contentValidation, blogIdValidation, inputValidatorMiddleware,async (req: Request, res: Response) => {
    const data: PostsInterface = req.body;
    const newPost = await postsRepository.createPost(data);

    if (newPost) {
      res.status(201).send(newPost);
    } else {
      res.sendStatus(404);
    }
  });

postsRouter.put("/:id", authMiddleware, titileValidation,
  shortDescriptionValidation, contentValidation, blogIdValidation, inputValidatorMiddleware,async (req: Request, res: Response) => {

    const data = req.body;

    const isUpdated = await postsRepository.updatePost(req.params.id, data);

    if (isUpdated) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }

  });


postsRouter.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  const isDelited = await postsRepository.deletePost(req.params.id);
  if (isDelited) {
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});
