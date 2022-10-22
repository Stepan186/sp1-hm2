import express, {Request, Response} from "express"
import { testingRouter, videosRouter } from "./routers/videos-router";
import bodyParser from "body-parser";
import { blogsRouter } from "./routers/blogs-router";
import { postsRouter } from "./routers/posts-router";

const app = express()
const port = process.env.PORT || 3000
const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/blogs', blogsRouter)
app.use('/testing', testingRouter)
app.use('/posts', postsRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
