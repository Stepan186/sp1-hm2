import { v4 } from "uuid";
import { blogsCollection } from "../../db";
import { ObjectID, ObjectId } from "mongodb";

export const blogsRepository = {

  async findBlogById (id: string): Promise<BlogInterface | null> {

    const blog: BlogInterface | null = await blogsCollection.findOne({_id: new ObjectId(id)})

    if (blog) {
      return blog;
    } else {
      return null
    }
  },

  async findBlogs (): Promise<BlogInterface[]> {
    return await blogsCollection.find().toArray()
  },

 async createBlog (data: BlogCreateInterface) : Promise<BlogInterface> {
    const newBlog = { name: data.name, youtubeUrl: data.youtubeUrl, createdAt: new Date().toISOString()};
    await blogsCollection.insertOne(newBlog)
    return newBlog

  },

 async updateBlog (id: string, data: BlogUpdateInterface): Promise<boolean> {
    const result = await blogsCollection.updateOne({_id: new ObjectId(id)}, {$set: {data}})
    return result.matchedCount === 1
  },

  async deleteBlog(id: string): Promise<boolean> {
    const result = await blogsCollection.deleteOne({_id: new ObjectId(id)})
    return result.deletedCount === 1
  }
};
