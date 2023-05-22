import { Action, createAction, createSlice } from "@reduxjs/toolkit"
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
  error: unknown
}

const initialState: IPostsState = {
  list: [],
  isLoading: false,
  error: null,
}

export function* getPostsSaga(action): any {
  try {
    yield put(getPostsLoading(true))
    const posts = yield fetchPosts(action.payload)
    yield put(getPostsSuccess(posts))
  } catch (e) {
    yield put(getPostsError(e))
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
    },
    getPostsError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const GET_POSTS = "posts/getPosts"
export const getPosts = createAction<number | undefined>(GET_POSTS)

export const { getPostsSuccess, getPostsError, getPostsLoading } =
  postsSlice.actions

export default postsSlice.reducer
