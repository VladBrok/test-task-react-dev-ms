import { createAction, createSlice } from "@reduxjs/toolkit"
import { put } from "redux-saga/effects"
import { fetchPosts } from "./postsAPI"

export interface IPost {
  id: number
  userId: number
  title: string
  body: string
}

export interface IPostsState {
  list: IPost[]
  isLoading: boolean
  isError: boolean
}

const initialState: IPostsState = {
  list: [],
  isLoading: false,
  isError: false,
}

export function* getPostsSaga(action): any {
  try {
    yield put(getPostsLoading(true))
    const posts = yield fetchPosts(action.payload)
    yield put(getPostsSuccess(posts))
  } catch (e) {
    console.error(e)
    yield put(getPostsError())
  } finally {
    yield put(getPostsLoading(false))
  }
}

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPostsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    getPostsSuccess: (state, action) => {
      state.list = action.payload
      state.isError = false
    },
    getPostsError: (state) => {
      state.isError = true
    },
  },
})

export const GET_POSTS = "posts/getPosts"
export const getPosts = createAction<number | undefined>(GET_POSTS)

export const { getPostsSuccess, getPostsError, getPostsLoading } =
  postsSlice.actions

export default postsSlice.reducer
