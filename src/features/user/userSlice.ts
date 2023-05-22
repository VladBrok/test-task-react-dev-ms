import { createAction, createSlice } from "@reduxjs/toolkit"
import { put } from "redux-saga/effects"
import { fetchUser } from "./userAPI"

export interface IUser {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
}

export interface IUserState {
  info: IUser | null
  isLoading: boolean
  isError: boolean
}

const initialState: IUserState = {
  info: null,
  isLoading: false,
  isError: false,
}

export function* getUserSaga(action): any {
  const userId = action.payload

  try {
    yield put(getUserError(false))
    yield put(getUserLoading(true))
    const posts = yield fetchUser(userId)
    yield put(getUserSuccess(posts))
  } catch (e) {
    console.error(e)
    yield put(getUserError(true))
  } finally {
    yield put(getUserLoading(false))
  }
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserLoading: (state, action) => {
      state.isLoading = action.payload
    },
    getUserSuccess: (state, action) => {
      state.info = action.payload
      state.isError = false
    },
    getUserError: (state, action) => {
      state.isError = action.payload
    },
  },
})

export const GET_USER = "user/getUser"
export const getUser = createAction<number>(GET_USER)

export const { getUserError, getUserLoading, getUserSuccess } =
  userSlice.actions

export default userSlice.reducer
