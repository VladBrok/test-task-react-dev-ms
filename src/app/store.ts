import createSagaMiddleware from "redux-saga"
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import postsReducer from "../features/posts/postsSlice"
import { takeEvery } from "redux-saga/effects"
import { GET_POSTS, getPostsSaga } from "../features/posts/postsSlice"
import commentsReducer, {
  GET_COMMENTS,
  getCommentsSaga,
} from "../features/comments/commentsSlice"
import userReducer, { GET_USER, getUserSaga } from "../features/user/userSlice"

function* sagas() {
  yield takeEvery(GET_POSTS, getPostsSaga)
  yield takeEvery(GET_COMMENTS, getCommentsSaga)
  yield takeEvery(GET_USER, getUserSaga)
}

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(sagas)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
