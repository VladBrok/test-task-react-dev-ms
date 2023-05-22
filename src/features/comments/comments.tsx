import "./comments.css"
import ListGroup from "react-bootstrap/ListGroup"
import { useAccordionButton } from "react-bootstrap/AccordionButton"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"
import Container from "react-bootstrap/Container"
import Spinner from "react-bootstrap/Spinner"
import Accordion from "react-bootstrap/Accordion"
import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  areCommentsLoading,
  getComments,
  isCommentsError,
  selectCommentsByPostId,
} from "./commentsSlice"
import { shallowEqual } from "react-redux"

export interface ICommentsProps {
  postId: number
}

const ACCORDION_KEY = "0"

// TODO: add alert for no comments

export default function Comments(props: ICommentsProps) {
  const [activeKey, setActiveKey] = useState("")

  const comments = useAppSelector(
    selectCommentsByPostId(props.postId),
    shallowEqual,
  )
  const isLoading = useAppSelector(areCommentsLoading(props.postId))
  const isError = useAppSelector(isCommentsError(props.postId))
  const dispatch = useAppDispatch()

  const decoratedOnClick = useAccordionButton(ACCORDION_KEY, () => {
    setActiveKey((prev) => (prev ? "" : ACCORDION_KEY))
  })

  useEffect(() => {
    if (!activeKey) {
      return
    }

    dispatch(getComments(props.postId))
  }, [activeKey, dispatch, props.postId])

  return (
    <Accordion activeKey={activeKey}>
      <Button onClick={decoratedOnClick}>Комментарии</Button>
      <Accordion.Collapse eventKey={ACCORDION_KEY}>
        <Container fluid className="mt-3">
          {isLoading && (
            <div className="d-flex justify-center">
              {" "}
              <Spinner animation="border" className="mx-auto" />
            </div>
          )}
          {isError && (
            <Alert variant="danger">
              При загрузке комментариев произошла ошибка. Попробуйте позже.
            </Alert>
          )}
          {!isLoading && !isError && (
            <ListGroup className="comments__list">
              {comments.map((comment) => (
                <ListGroup.Item
                  className="border-start-0 border-end-0"
                  key={comment.id}
                >
                  <Card className="border-0">
                    <Card.Text className="fw-bold mb-1">
                      {comment.email}
                    </Card.Text>
                    <Card.Text>{comment.body}</Card.Text>
                  </Card>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Container>
      </Accordion.Collapse>
    </Accordion>
  )
}
