import { postsCollection } from "../../db";
import { ObjectId } from "mongodb";
import { v4 } from "uuid";


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
        shortDescription: v.shortDescription
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
        blogName: post.blogName
      };
    } else {
      return null
    }
    },

  async createPost(data: PostsInterface): Promise<PostsInterface> {

    const newPost: PostsInterface = {
      id: v4(),
      title: data.title,
      shortDescription: data.shortDescription,
      content: data.content,
      blogId: data.blogId,
      blogName: data.blogName,
    };

    const post = await postsCollection.insertOne(newPost);
    return {
      id: newPost.id,
      title: newPost.title,
      shortDescription: newPost.shortDescription,
      content: newPost.content,
      blogId: newPost.blogId,
      blogName: newPost.blogName
    };

  },

  async updatePost(id: string, data: PostUpdateInterface): Promise<boolean> {

    const result = await postsCollection.updateOne({ id: id }, { ...data });
    return result.matchedCount === 1;

  },

  async deletePost(id: string): Promise<boolean> {
    const result = await postsCollection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
};
