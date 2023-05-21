import { useState } from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Stack from "react-bootstrap/Stack"
import Navbar from "react-bootstrap/Navbar"
import Card from "react-bootstrap/Card"
import Offcanvas from "react-bootstrap/Offcanvas"
import { useLocation, useNavigate } from "react-router-dom"
import "./header.css"
import { ROUTE_PATHS } from "../../lib/shared"
import Avatar from "../avatar/avatar"

interface IMenuLink {
  route: string
  name: string
}

const MENU_LINKS: IMenuLink[] = [
  {
    route: ROUTE_PATHS.ROOT,
    name: "Список постов",
  },
  {
    route: ROUTE_PATHS.ABOUT,
    name: "Обо мне",
  },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const goTo = (route: string): void => {
    navigate(route)
    setIsMenuOpen(false)
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand={false} className="mb-3">
        <Container fluid>
          <Navbar.Toggle onClick={() => setIsMenuOpen((prev) => !prev)} />
          <Navbar.Brand href="#">Блог</Navbar.Brand>
          <Navbar.Offcanvas
            placement="start"
            show={isMenuOpen}
            onHide={() => setIsMenuOpen(false)}
          >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body>
              <Stack direction="horizontal" gap={3} className="pb-2">
                <Avatar className="w-25 border" />
                <Card className="border-0">
                  <Card.Title>Владислав</Card.Title>
                  <Card.Text>vlad.brok99@gmail.com</Card.Text>
                </Card>
              </Stack>
              <Nav
                activeKey={location.pathname}
                className="d-flex flex-column gap-4 mt-5 px-4"
              >
                {MENU_LINKS.map((link, i) => (
                  <Nav.Link
                    eventKey={link.route}
                    onClick={() => goTo(link.route)}
                    className="header__link py-3 px-4 rounded-2 "
                    key={i}
                  >
                    {link.name}
                  </Nav.Link>
                ))}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  )
}
