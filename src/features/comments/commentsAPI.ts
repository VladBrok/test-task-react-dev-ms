import { Client } from "../../infrastructure"
import { IComment } from "./commentsSlice"

export async function fetchComments(postId: number): Promise<IComment[]> {
  const response = await Client.get<IComment[]>(`/posts/${postId}/comments`)
  return response.data
}
