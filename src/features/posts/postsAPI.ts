import { Client } from "../../infrastructure"
import { IPost } from "./postsSlice"

export async function fetchPosts(userId?: number): Promise<IPost[]> {
  console.log(userId)
  const requestUrl = userId ? `/posts?userId=${userId}` : "/posts"
  const response = await Client.get<IPost[]>(requestUrl)
  return response.data
}
