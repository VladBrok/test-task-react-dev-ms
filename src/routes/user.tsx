import { useParams } from "react-router-dom"

export default function User() {
  const id = useParams().id

  return <div>user # {id}</div>
}
