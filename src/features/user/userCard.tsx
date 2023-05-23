import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import PostList from "../posts/postList"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getUser } from "./userSlice"
import Avatar from "../avatar/avatar"
import ListGroup from "react-bootstrap/ListGroup"

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
        <Card className="border-end-0 border-start-0">
          <Avatar className="border-secondary border-2 rounded-circle m-4 mb-0" />
          <Card.Body>
            <Card.Title className="text-center">
              {user.info?.name} ({user.info?.username})
            </Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              email: <span className="fw-bold"> {user.info?.email}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              phone: <span className="fw-bold">{user.info?.phone}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              website: <span className="fw-bold">{user.info?.website}</span>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
      <div style={{ overflowY: "auto", flex: "1 1 70%" }}>
        <PostList userId={props.userId} />
      </div>
    </Container>
  )
}
