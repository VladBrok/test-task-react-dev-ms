import { createAction, createSlice } from "@reduxjs/toolkit"
import { put } from "redux-saga/effects"
import { fetchComments } from "./commentsAPI"
import { RootState } from "../../app/store"

export interface IComment {
  id: number
  email: string
  body: string
}

export interface IComments {
  list: IComment[]
  isLoading: boolean
  isError: boolean
}

export type CommentsState = Record<number, IComments>

const getInitialCommentsState = (): IComments => ({
  isError: false,
  isLoading: false,
  list: [],
})
const initialState: CommentsState = {}

export function* getCommentsSaga(action): any {
  const postId = action.payload

  try {
    yield put(getCommentsError({ postId, isError: false }))
    yield put(
      getCommentsLoading({
        postId,
        isLoading: true,
      }),
    )
    const comments = yield fetchComments(postId)
    yield put(
      getCommentsSuccess({
        postId,
        comments,
      }),
    )
  } catch (e) {
    console.error(e)
    yield put(getCommentsError({ postId, isError: true }))
  } finally {
    yield put(
      getCommentsLoading({
        postId,
        isLoading: false,
      }),
    )
  }
}

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    getCommentsLoading: (state, action) => {
      if (!state[action.payload.postId]) {
        state[action.payload.postId] = getInitialCommentsState()
      }
      state[action.payload.postId].isLoading = action.payload.isLoading
    },
    getCommentsSuccess: (state, action) => {
      if (!state[action.payload.postId]) {
        state[action.payload.postId] = getInitialCommentsState()
      }
      state[action.payload.postId].list = action.payload.comments
      state[action.payload.postId].isError = false
    },
    getCommentsError: (state, action) => {
      if (!state[action.payload.postId]) {
        state[action.payload.postId] = getInitialCommentsState()
      }
      state[action.payload.postId].isError = action.payload.isError
    },
  },
})

export const GET_COMMENTS = "comments/getComments"
export const getComments = createAction<number>(GET_COMMENTS)

export const selectCommentsByPostId =
  (postId: number) =>
  (state: RootState): IComment[] =>
    state.comments[postId]?.list || []

export const areCommentsLoading =
  (postId: number) =>
  (state: RootState): boolean =>
    state.comments[postId]?.isLoading || false

export const isCommentsError =
  (postId: number) =>
  (state: RootState): boolean =>
    state.comments[postId]?.isError || false

export const { getCommentsError, getCommentsLoading, getCommentsSuccess } =
  commentsSlice.actions

export default commentsSlice.reducer
