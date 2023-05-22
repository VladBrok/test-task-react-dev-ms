import Container from "react-bootstrap/Container"
import PostList from "../posts/postList"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getUser } from "./userSlice"

export interface IUserCardProps {
  userId: number
}

export default function UserCard(props: IUserCardProps) {
  const user = useAppSelector((state) => state.user)
  const isLoading = useAppSelector((state) => state.user.isLoading)
  const isError = useAppSelector((state) => state.user.isError)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUser(props.userId))
  }, [dispatch, props.userId])

  console.log(user.info, isLoading, isError)

  // TODO: extract styles to classes
  return (
    <Container
      fluid
      className="d-flex p-0 mt-5 pt-2"
      style={{ height: "calc(100vh - 48px)", overflow: "hidden" }}
    >
      <div style={{ flex: "1 1 30%" }} className="border-end">
        user # {props.userId}
      </div>
      <div style={{ overflowY: "auto", flex: "1 1 70%" }}>
        <PostList userId={props.userId} />
      </div>
    </Container>
  )
}
