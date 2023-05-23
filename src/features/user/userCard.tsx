import "./userCard.css"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import PostList from "../posts/postList"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getUser } from "./userSlice"
import Avatar from "../avatar/avatar"
import ListGroup from "react-bootstrap/ListGroup"
import Alert from "react-bootstrap/Alert"
import Spinner from "react-bootstrap/Spinner"

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

  return (
    <Container fluid className="d-flex p-0 mt-5 pt-2 user-card__container">
      <div className="border-end user-card__info">
        {isLoading && (
          <div className="d-flex justify-center mt-5">
            {" "}
            <Spinner animation="border" className="mx-auto" />
          </div>
        )}
        {isError && (
          <Alert variant="danger" className="mt-5 mx-3">
            При загрузке информации о пользователе произошла ошибка. Попробуйте
            перезагрузить страницу.
          </Alert>
        )}
        {!isLoading && !isError && (
          <Card className="border-end-0 border-start-0">
            <div className="px-4 d-flex justify-content-center">
              <Avatar className="user-card__avatar mt-4 border-secondary border-2 rounded-circle" />
            </div>
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
        )}
      </div>
      <div className="user-card__posts">
        <PostList userId={props.userId} />
      </div>
    </Container>
  )
}
