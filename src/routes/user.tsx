import { useParams } from "react-router-dom"
import UserCard from "../features/user/userCard"

export default function User() {
  const id = useParams().id

  // TODO: handle case with nan (user id may not be a number)

  return <UserCard userId={Number.parseInt(id!)} />
}
