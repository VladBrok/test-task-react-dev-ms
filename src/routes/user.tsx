import { useParams } from "react-router-dom"
import UserCard from "../features/user/userCard"

export default function User() {
  const id = +(useParams().id || NaN)

  return <UserCard userId={id} />
}
