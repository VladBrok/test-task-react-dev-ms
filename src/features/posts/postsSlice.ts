import { createAction, createSlice } from "@reduxjs/toolkit"
import { put } from "redux-saga/effects"

export interface IPost {
  id: number
  userId: number
  title: string
  text: string
}

export type PostsState = IPost[]

const initialState: PostsState = []

export function* getPostsSaga(): any {
  const posts: IPost[] = [
    {
      id: 1,
      userId: 1,
      title: "capibara",
      text: "my favorite animal",
    },
  ]

  yield posts

  yield put(getPostsSuccess(posts))
}

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPostsSuccess: (_, action) => {
      return action.payload
    },
  },
})

export const GET_POSTS = "posts/getPosts"
export const getPosts = createAction(GET_POSTS)

export const { getPostsSuccess } = postsSlice.actions

export default postsSlice.reducer
