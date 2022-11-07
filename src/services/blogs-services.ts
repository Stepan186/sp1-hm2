import { blogsRepository } from "../repositories/blogs/blogs-db-repository";
import { BlogInterface } from "../utilities/interfaces/blogs/blog-interface";
import { blogsQueryRepository, orderByType, paginationType } from "../repositories/blogs/blogs-query-repository";
import { postsRepository } from "../repositories/posts/posts-db-repository";
import {
  CreatePostForBlogInterface, PostsResponseInteface
} from "../utilities/interfaces/posts/posts-interface";

export const blogsServices = {

  createBlog: async(data: BlogCreateInterface): Promise<BlogInterface> => {
    return blogsRepository.createBlog(data);
  },

  updateBlog: async(id: string, data: BlogUpdateInterface): Promise<boolean> => {
    return blogsRepository.updateBlog(id, data);
  },

  deleteBlog: async(id: string): Promise<boolean> => {
    return blogsRepository.deleteBlog(id);
  },

  createPostForBlog: async(blogId: string, data: CreatePostForBlogInterface) => {
    const blog: BlogInterface|null = await blogsQueryRepository.findBlogById(blogId);
    if (blog) {
     return await postsRepository.createPostForBlog(data, blog);
    }
  },

  getPostsForBlog: async(pagination: paginationType, orderBy: orderByType, blogId: string): Promise<PostsResponseInteface> => {
    return await blogsQueryRepository.findPostsForBlog(pagination, blogId, orderBy);
  }
};
