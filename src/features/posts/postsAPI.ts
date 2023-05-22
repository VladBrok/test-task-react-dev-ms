import { Client } from "../../infrastructure"
import { IPost } from "./postsSlice"

export async function fetchPosts(): Promise<IPost[]> {
  const response = await Client.get<IPost[]>("/posts")
  return response.data
}
