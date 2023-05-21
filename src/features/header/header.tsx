import { useState } from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Offcanvas from "react-bootstrap/Offcanvas"
import { useLocation, useNavigate } from "react-router-dom"
import "./header.css"

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
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Меню</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="p-0">
              <Nav
                fill
                activeKey={location.pathname}
                className="d-flex flex-column gap-4 mt-5"
              >
                <Nav.Link
                  eventKey="/"
                  onClick={() => goTo("/")}
                  className="header__link"
                >
                  Список постов
                </Nav.Link>
                <Nav.Link
                  eventKey="/about"
                  onClick={() => goTo("/about")}
                  className="header__link"
                >
                  Обо мне
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  )
}
