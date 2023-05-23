import "./postList.css"
import { Suspense, lazy, startTransition, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getPosts } from "./postsSlice"
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import Spinner from "react-bootstrap/Spinner"

const Alert = lazy(() => import("react-bootstrap/Alert"))
const Card = lazy(() => import("react-bootstrap/Card"))
const CardText = lazy(() =>
  import("react-bootstrap/Card").then((module) => ({
    default: module.default.Text,
  })),
)
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
const Comments = lazy(() => import("../comments/comments"))

export interface IPostListProps {
  userId?: number
}

export default function PostList(props: IPostListProps) {
  const posts = useAppSelector((state) => state.posts.list)
  const isLoading = useAppSelector((state) => state.posts.isLoading)
  const isError = useAppSelector((state) => state.posts.isError)
  const dispatch = useAppDispatch()

  useEffect(() => {
    startTransition(() => {
      dispatch(getPosts(props.userId))
    })
  }, [dispatch, props.userId])

  const noPostsText =
    props.userId != null
      ? "У данного пользователя пока нет постов."
      : "Постов пока нет. Заходите позже."

  const spinner = <Spinner animation="grow" className="mx-auto mt-5" />

  return (
    <Container className="post-list__container p-5">
      <Stack gap={4}>
        <Suspense fallback={spinner}>
          <>
            {isLoading && spinner}
            {isError && (
              <Alert variant="danger">
                При загрузке постов произошла ошибка. Попробуйте перезагрузить
                страницу.
              </Alert>
            )}
            {!isLoading &&
              !isError &&
              (posts.length ? (
                posts.map((post) => (
                  <Card key={post.id} className="rounded-3">
                    <CardBody>
                      <Avatar
                        className="post-list__avatar border border-secondary rounded-circle"
                        userId={post.userId}
                      />
                      <CardTitle>{post.title}</CardTitle>
                      <CardText>{post.body}</CardText>
                      <Comments postId={post.id} />
                    </CardBody>
                  </Card>
                ))
              ) : (
                <Alert variant="secondary">{noPostsText}</Alert>
              ))}
          </>
        </Suspense>
      </Stack>
    </Container>
  )
}
