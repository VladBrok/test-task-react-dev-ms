import { Client } from "../../infrastructure"
import { IUser } from "./userSlice"

export async function fetchUser(id: number): Promise<IUser> {
  const response = await Client.get<IUser>(`users/${id}`)
  return response.data
}
