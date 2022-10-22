import { Request, Response, Router } from "express";
import { blogsRepository } from "../repositories/blogs-repository";
import { inputValidatorMiddleware, nameValidator, youtubeUrlValidator } from "../middlewares/blogs-middleware";
import { authMiddleware } from "../middlewares/auth-middleware";

export const blogsRouter = Router({})


blogsRouter.get('/', (req: Request, res: Response) => {
  const blogs = blogsRepository.findBlogs()
  res.send(blogs)
})

blogsRouter.get('/:id', (req: Request, res: Response) => {

  const blog = blogsRepository.findBlogById(req.params.id)

  if (blog) {
    res.send(blog)
  } else {
    res.send(404)
  }

})

blogsRouter.post('/', authMiddleware, nameValidator, youtubeUrlValidator, inputValidatorMiddleware, (req: Request, res: Response) => {
  const data = req.body
  const newBlog = blogsRepository.createBlog(data)
  res.status(201).send(newBlog)
})

blogsRouter.put('/:id', (req: Request, res: Response) => {
  const data = req.body
  const isUpdated = blogsRepository.updateBlog(req.params.id, data)
  if (isUpdated) {
    res.send(204)
  } else {
    res.send(404)
  }
})

blogsRouter.delete('/:id',  authMiddleware, (req: Request, res: Response) => {
  const isDeleted = blogsRepository.deleteBlog(req.params.id)
  if (isDeleted) {
    res.send(204)
  } else {
    res.send(404)
  }
})

