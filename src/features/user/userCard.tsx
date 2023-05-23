import "./userCard.css"
import Container from "react-bootstrap/Container"
import PostList from "../posts/postList"
import { Suspense, lazy, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getUser } from "./userSlice"

const Spinner = lazy(() => import("react-bootstrap/Spinner"))
const ListGroup = lazy(() => import("react-bootstrap/ListGroup"))
const ListGroupItem = lazy(() => import("react-bootstrap/ListGroupItem"))
const Alert = lazy(() => import("react-bootstrap/Alert"))
const Card = lazy(() => import("react-bootstrap/Card"))
const CardTitle = lazy(() =>
  import("react-bootstrap/Card").then((module) => ({
    default: module.default.Title,
  })),
)
const CardBody = lazy(() =>
  import("react-bootstrap/Card").then((module) => ({
    default: module.default.Body,
  })),
)
const Avatar = lazy(() => import("../avatar/avatar"))

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
      <Suspense>
        <div className="border-end user-card__info">
          {isLoading && (
            <div className="d-flex justify-center mt-5">
              {" "}
              <Spinner animation="border" className="mx-auto" />
            </div>
          )}
          {isError && (
            <Alert variant="danger" className="mt-5 mx-3">
              При загрузке информации о пользователе произошла ошибка.
              Попробуйте перезагрузить страницу.
            </Alert>
          )}
          {!isLoading && !isError && (
            <Card className="border-end-0 border-start-0">
              <div className="px-4 d-flex justify-content-center">
                <Avatar className="user-card__avatar mt-4 border-secondary border-2 rounded-circle" />
              </div>
              <CardBody>
                <CardTitle className="text-center">
                  {user.info?.name} ({user.info?.username})
                </CardTitle>
              </CardBody>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  email: <span className="fw-bold"> {user.info?.email}</span>
                </ListGroupItem>
                <ListGroupItem>
                  phone: <span className="fw-bold">{user.info?.phone}</span>
                </ListGroupItem>
                <ListGroupItem>
                  website: <span className="fw-bold">{user.info?.website}</span>
                </ListGroupItem>
              </ListGroup>
            </Card>
          )}
        </div>
      </Suspense>
      <div className="user-card__posts">
        <PostList userId={props.userId} />
      </div>
    </Container>
  )
}
