import { blogsCollection, postsCollection } from "../../db";
import { ObjectId } from "mongodb";
import { v4 } from "uuid";
import { blogsRepository } from "../blogs/blogs-db-repository";


export const postsRepository = {

  async findPosts(): Promise<PostsInterface[]> {
    const posts = await postsCollection.find().toArray();
    return posts.map((v) => {
      return {
        id: v.id,
        blogId: v.blogId,
        blogName: v.blogName,
        content: v.content,
        title: v.title,
        shortDescription: v.shortDescription,
        createdAt: v.createdAt
      };
    });
  },


  async findPostById(id: string): Promise<PostsInterface|null> {
    const post: PostsInterface | null = await postsCollection.findOne({ id: id });
    if (post) {
      return {
        id: post.id,
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt
      };
    } else {
      return null
    }
    },

  async createPost(data: PostsInterface): Promise<PostsInterface | null> {

    const blog: BlogInterface | null = await blogsRepository.findBlogById(data.blogId)

    if (blog) {
      const newPost: PostsInterface = {
        id: v4(),
        title: data.title,
        shortDescription: data.shortDescription,
        content: data.content,
        blogId: data.blogId,
        blogName: blog?.name,
        createdAt: new Date().toISOString()
      };

      const post = await postsCollection.insertOne(newPost);
      return {
        id: newPost.id,
        title: newPost.title,
        shortDescription: newPost.shortDescription,
        content: newPost.content,
        blogId: newPost.blogId,
        blogName: newPost.blogName,
        createdAt: newPost.createdAt
      };
    } else {
      return null
    }

  },

  async updatePost(id: string, data: PostUpdateInterface): Promise<boolean> {

    const blog = await blogsRepository.findBlogById(data.blogId)

    if (blog) {
      const result = await postsCollection.updateOne({ id: id }, {$set: {...data, blogName: blog.name}});
      return result.matchedCount === 1;
    } else {
      return false
    }

  },

  async deletePost(id: string): Promise<boolean> {
    const result = await postsCollection.deleteOne({ id: id });
    return result.deletedCount === 1;
  }
};
