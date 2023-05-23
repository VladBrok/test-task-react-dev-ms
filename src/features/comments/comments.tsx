import "./comments.css"
import { useAccordionButton } from "react-bootstrap/AccordionButton"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Accordion from "react-bootstrap/Accordion"
import { Suspense, lazy, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  areCommentsLoading,
  getComments,
  isCommentsError,
  selectCommentsByPostId,
} from "./commentsSlice"
import { shallowEqual } from "react-redux"
import Spinner from "react-bootstrap/Spinner"

const Alert = lazy(() => import("react-bootstrap/Alert"))
const ListGroup = lazy(() => import("react-bootstrap/ListGroup"))
const ListGroupItem = lazy(() => import("react-bootstrap/ListGroupItem"))
const Card = lazy(() => import("react-bootstrap/Card"))
const CardText = lazy(() =>
  import("react-bootstrap/Card").then((module) => ({
    default: module.default.Text,
  })),
)

export interface ICommentsProps {
  postId: number
}

const ACCORDION_KEY = "0"

export default function Comments(props: ICommentsProps) {
  const [activeKey, setActiveKey] = useState("")

  const isOpen = Boolean(activeKey)

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
    if (!isOpen) {
      return
    }

    dispatch(getComments(props.postId))
  }, [dispatch, isOpen, props.postId])

  const spinner = (
    <div className="d-flex justify-center">
      {" "}
      <Spinner animation="grow" className="mx-auto" />
    </div>
  )

  return (
    <Accordion activeKey={activeKey}>
      <Button onClick={decoratedOnClick}>Комментарии</Button>
      <Accordion.Collapse eventKey={ACCORDION_KEY}>
        <Container fluid className="mt-3">
          <Suspense fallback={spinner}>
            {isOpen && (
              <>
                {isLoading && spinner}
                {isError && (
                  <Alert variant="danger">
                    При загрузке комментариев произошла ошибка. Попробуйте
                    позже.
                  </Alert>
                )}
                {!isLoading &&
                  !isError &&
                  (comments.length ? (
                    <ListGroup className="comments__list">
                      {comments.map((comment) => (
                        <ListGroupItem
                          className="border-start-0 border-end-0"
                          key={comment.id}
                        >
                          <Card className="border-0">
                            <CardText className="fw-bold mb-1">
                              {comment.email}
                            </CardText>
                            <CardText>{comment.body}</CardText>
                          </Card>
                        </ListGroupItem>
                      ))}
                    </ListGroup>
                  ) : (
                    <Alert variant="secondary">
                      У данного поста нет комментариев.
                    </Alert>
                  ))}
              </>
            )}
          </Suspense>
        </Container>
      </Accordion.Collapse>
    </Accordion>
  )
}
