import { ObjectId } from "mongodb";

export interface BlogInterface {
  id: string,
  name: string,
  youtubeUrl: string,
  createdAt: string
}

export interface IBlogDb {
  name: string,
  youtubeUrl: string,
  createdAt: string
}
export type IBlogView =  {
  id: string
}  &  Omit<IBlogDb, '_id'>


export interface BlogDb {
  _id: ObjectId,
  name: string,
  youtubeUrl: string,
  createdAt: string
}
