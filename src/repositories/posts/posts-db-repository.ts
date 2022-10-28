import { postsCollection } from "../../db";
import { ObjectId } from "mongodb";

export const postsRepository = {

  async findPosts(): Promise<PostsInterface[]> {
    return await postsCollection.find().toArray()
  },

  async findPostById(id: string): Promise<PostsInterface|null> {
    return await postsCollection.findOne({ _id: new ObjectId(id) })
  },

  async createPost(data: PostsInterface): Promise<PostsInterface> {

    const newPost: PostsInterface = {
      title: data.title,
      shortDescription: data.shortDescription,
      content: data.content,
      blogId: data.blogId,
      blogName: data.blogName,
      createdAt: new Date().toString()
    };

    await postsCollection.insertOne(newPost)
    return newPost

  },

  async updatePost(id: string, data: PostUpdateInterface): Promise<boolean> {

    const result = await postsCollection.updateOne({ _id: new ObjectId(id) }, { ...data })
    return result.matchedCount === 1

  },

  async deletePost(id: string): Promise<boolean> {
    const result = await postsCollection.deleteOne({ _id: new ObjectId(id) })
    return result.deletedCount === 1
  }
}
