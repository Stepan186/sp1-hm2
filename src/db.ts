import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://stepan:test@test.nzcc6xg.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
const db = client.db('incubator')
export const blogsCollection = db.collection<BlogInterface>("blogs")
export const postsCollection = db.collection<PostsInterface>("posts")


export async function runDb() {
  try {
    console.log('before');
    await client.connect();
    console.log('after');
    await client.db("incubator").command({ ping: 1 });
    console.log("Connect successfully to mongo server");

  } catch(e) {
    console.log(e);
    console.log("Can't connect to mongo server");
    await client.close();
  }
}
