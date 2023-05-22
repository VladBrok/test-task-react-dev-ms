import ListGroup from "react-bootstrap/ListGroup"
import { useAccordionButton } from "react-bootstrap/AccordionButton"
import Button from "react-bootstrap/Button"
import Accordion from "react-bootstrap/Accordion"
import { useState } from "react"
import { Card } from "react-bootstrap"

export interface ICommentsProps {
  postId: number
}

const ACCORDION_KEY = "0"

export default function Comments(props: ICommentsProps) {
  const [activeKey, setActiveKey] = useState("")

  const decoratedOnClick = useAccordionButton(ACCORDION_KEY, () => {
    setActiveKey((prev) => (prev ? "" : ACCORDION_KEY))
  })

  return (
    <Accordion activeKey={activeKey}>
      <Button onClick={decoratedOnClick}>Комментарии</Button>
      <Accordion.Collapse eventKey={ACCORDION_KEY}>
        <ListGroup className="mt-3">
          <ListGroup.Item className="border-start-0 border-end-0">
            <Card className="border-0">
              <Card.Text className="fw-bold mb-1">vlad.bork@mail</Card.Text>
              <Card.Text>dsofmsdaf</Card.Text>
            </Card>
          </ListGroup.Item>
        </ListGroup>
      </Accordion.Collapse>
    </Accordion>
  )
}
