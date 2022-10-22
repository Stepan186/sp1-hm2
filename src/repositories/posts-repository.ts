import { blogsRepository } from "./blogs-repository";
import { v4 } from "uuid";

const posts: Array<PostsInterface> = []

export const postsRepository = {
  findPosts: () => {
    return posts
  },

  findPostById: (id: string) => {
    const post = posts.find((v: {id: string}) => v.id === id)
    if (post) {
      return post
    } else {
      return false
    }
  },

  createPost: (data: PostsInterface) => {
    const blog = blogsRepository.findBlogById(data.blogId)

    if (blog) {
      const newPost: PostsInterface = {
        id: v4(),
        title: data.title,
        shortDescription: data.shortDescription,
        content: data.content,
        blogId: data.blogId,
        blogName: blog.name
      }

      posts.push(newPost)

      return newPost
    } else {
      return false
    }
  },

  updatePost: (id: string, data: PostUpdateInterface) => {

    const post = postsRepository.findPostById(id)

    if (data.blogId) {
      const blog = blogsRepository.findBlogById(data.blogId)

      if (blog) {
        Object.assign(post, {...data})
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  },

  deletePost: (id: string) => {

    const post = posts.findIndex((v :{id: string}) => v.id === id)

    if (post){
      posts.splice(post, 1)
      return true
    } else {
      return false
    }
  }
}