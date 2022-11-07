import { MongoClient, ServerApiVersion } from "mongodb";
import * as dotenv from 'dotenv'
import { IBlogDb } from "./utilities/interfaces/blogs/blog-interface";
import { PostDbInterface } from "./utilities/interfaces/posts/posts-interface";
dotenv.config()

const uri = process.env.MONGO_URI

if (!uri) {
  throw Error('mongo uri error')
}

const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
const db = client.db('incubator')
export const blogsCollection = db.collection<IBlogDb>("blogs")
export const postsCollection = db.collection<PostDbInterface>("posts")

export async function runDb() {
  try {
    await client.connect();
    await client.db("incubator").command({ ping: 1 });
    console.log("Connect successfully to mongo server");

  } catch(e) {
    console.log(e);
    console.log("Can't connect to mongo server");
    await client.close();
  }
}
