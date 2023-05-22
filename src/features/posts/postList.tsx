import "./postList.css"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getPosts } from "./postsSlice"
import Container from "react-bootstrap/Container"
import Card from "react-bootstrap/Card"
import Avatar from "../avatar/avatar"
import Stack from "react-bootstrap/Stack"
import Alert from "react-bootstrap/Alert"
import Spinner from "react-bootstrap/Spinner"

export interface IPostListProps {
  userId?: number
}

// TODO: add lazy loading (in other components too)

export default function PostList(props: IPostListProps) {
  const posts = useAppSelector((state) => state.posts.list)
  const isLoading = useAppSelector((state) => state.posts.isLoading)
  const isError = useAppSelector((state) => state.posts.isError)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPosts(props.userId))
  }, [dispatch, props.userId])

  return (
    <Container className="post-list__container px-5">
      <Stack gap={4}>
        {isLoading && <Spinner animation="border" className="mx-auto mt-5" />}
        {isError && (
          <Alert variant="danger">
            При загрузке постов произошла ошибка. Попробуйте перезагрузить
            страницу.
          </Alert>
        )}
        {posts.map((post) => (
          <Card key={post.id} className="rounded-3">
            <Card.Body>
              <Avatar className="post-list__avatar border border-secondary" />
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.body}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Stack>
    </Container>
  )
}
