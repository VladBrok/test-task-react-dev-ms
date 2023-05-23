import { Client } from "../../infrastructure"
import { IPost } from "./postsSlice"

export async function fetchPosts(userId?: number): Promise<IPost[]> {
  const requestUrl = userId != null ? `/posts?userId=${userId}` : "/posts"
  const response = await Client.get<IPost[]>(requestUrl)
  return response.data
}
