import { blogsCollection } from "../../db";
import { BlogInterface, IBlogDb } from "../../utilities/interfaces/blogs/blog-interface";



export const blogsRepository = {

  async createBlog(data: BlogCreateInterface): Promise<BlogInterface> {
    const newBlog: IBlogDb = { name: data.name, youtubeUrl: data.youtubeUrl, createdAt: new Date().toISOString()};
    const result = await blogsCollection.insertOne(newBlog);
    return { id: result.insertedId.toString(), name: newBlog.name, youtubeUrl: newBlog.youtubeUrl, createdAt: newBlog.createdAt}

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
