import express from "express"
import { testingRouter} from "./routers/testing-router";
import bodyParser from "body-parser";
import { blogsRouter } from "./routers/blogs-router";
import { postsRouter } from "./routers/posts-router";
import { runDb } from "./db";

const app = express()
const port = process.env.PORT || 3000
const parserMiddleware = bodyParser({})


app.use(parserMiddleware)
app.use('/blogs', blogsRouter)
app.use('/testing', testingRouter)
app.use('/posts', postsRouter)




const startApp = async () => {
  await runDb()

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

startApp()

