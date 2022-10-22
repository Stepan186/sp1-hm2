import { Request, Response, Router } from "express";
import { postsRepository } from "../repositories/posts-repository";
import { authMiddleware } from "../middlewares/auth-middleware";
import {
  blogIdValidation,
  contentValidation,
  shortDescriptionValidation,
  titileValidation
} from "../middlewares/posts-middleware";
import { inputValidatorMiddleware } from "../middlewares/blogs-middleware";

export const postsRouter = Router({})

postsRouter.get('/', (req: Request, res: Response) => {
  const posts = postsRepository.findPosts()
  res.send(posts)
})

postsRouter.get('/:id', (req: Request, res: Response) => {
  const post = postsRepository.findPostById(req.params.id)

  if (post) {
    res.send(post)
  } else {
    res.sendStatus(404)
  }
})

postsRouter.post('/', authMiddleware, titileValidation,
  shortDescriptionValidation, contentValidation, blogIdValidation,inputValidatorMiddleware,   (req: Request, res: Response) => {
  const data: PostsInterface = req.body
  const newPost = postsRepository.createPost(data)

  if (newPost) {
    res.status(201).send(newPost)
  } else {
    res.sendStatus(404)
  }
})

postsRouter.put('/:id', authMiddleware, titileValidation,
  shortDescriptionValidation, contentValidation, blogIdValidation, inputValidatorMiddleware, (req: Request, res: Response) => {

  const data = req.body

  const isUpdated = postsRepository.updatePost(req.params.id, data)

  if (isUpdated) {
    res.sendStatus(204)
  } else {
    res.sendStatus(404)
  }

})


postsRouter.delete('/:id', (req: Request, res: Response) => {
  const isDelited = postsRepository.deletePost(req.params.id)
  if (isDelited) {
    res.sendStatus(204)
  } else {
    res.sendStatus(404)
  }
})
