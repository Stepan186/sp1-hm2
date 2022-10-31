import { v4 } from "uuid";
import { blogsCollection } from "../../db";

export const blogsRepository = {

  async findBlogById (id: string): Promise<BlogInterface | null> {

    const blog = await blogsCollection.findOne({id: id})

    if (blog) {
     return {id: blog.id, name: blog.name, youtubeUrl: blog.youtubeUrl, createdAt: blog.createdAt}
    } else {
      return null
    }
  },

  async findBlogs(): Promise<BlogInterface[]> {
    let blogs = await blogsCollection.find().toArray();
    return blogs.map((v) => {return { id: v.id, name: v.name, youtubeUrl: v.youtubeUrl, createdAt: v.createdAt };});
  },

  async createBlog(data: BlogCreateInterface): Promise<BlogInterface> {
    const newBlog = { id: v4(), name: data.name, youtubeUrl: data.youtubeUrl, createdAt: new Date().toISOString()};
    await blogsCollection.insertOne(newBlog);
    return { id: newBlog.id, name: newBlog.name, youtubeUrl: newBlog.youtubeUrl, createdAt: newBlog.createdAt}

  },

 async updateBlog (id: string, data: BlogUpdateInterface): Promise<boolean> {
    const result = await blogsCollection.updateOne({id: id}, {$set: {...data}})
    return result.matchedCount === 1
  },

  async deleteBlog(id: string): Promise<boolean> {
    const result = await blogsCollection.deleteOne({id: id})
    return result.deletedCount === 1
  }
};
