import { Request, Response, Router } from "express";
import { blogsCollection, postsCollection } from "../db";

export const testingRouter = Router({});

testingRouter.delete("/all-data", async (req: Request, res: Response) => {
  await postsCollection.drop()
  await blogsCollection.drop()
  res.sendStatus(204);
});
