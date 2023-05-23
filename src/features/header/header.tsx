import { Suspense, lazy, useEffect, useState } from "react"
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"
import Navbar from "react-bootstrap/Navbar"
import { useLocation, useNavigate } from "react-router-dom"
import "./header.css"
import { ROUTE_PATHS } from "../../lib/shared-constants"
import Spinner from "react-bootstrap/Spinner"

const OffcanvasHeader = lazy(() => import("react-bootstrap/OffcanvasHeader"))
const OffcanvasBody = lazy(() => import("react-bootstrap/OffcanvasBody"))
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
const Nav = lazy(() => import("react-bootstrap/Nav"))
const NavLink = lazy(() =>
  import("react-bootstrap/Nav").then((module) => ({
    default: module.default.Link,
  })),
)
const Avatar = lazy(() => import("../avatar/avatar"))

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
  const [shouldShowOffcanvasContent, setShouldShowOffcanvasContent] =
    useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const goTo = (route: string): void => {
    navigate(route)
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (isMenuOpen) {
      setShouldShowOffcanvasContent(true)
    }
  }, [isMenuOpen])

  const spinner = <Spinner animation="grow" className="mx-auto mt-5" />

  return (
    <>
      <Navbar
        fixed="top"
        bg="dark"
        variant="dark"
        expand={false}
        className="mb-3"
      >
        <Container fluid>
          <Navbar.Toggle onClick={() => setIsMenuOpen((prev) => !prev)} />
          <Navbar.Brand href="#">Блог</Navbar.Brand>
          <Navbar.Offcanvas
            placement="start"
            show={isMenuOpen}
            onHide={() => setIsMenuOpen(false)}
          >
            <Suspense fallback={spinner}>
              {shouldShowOffcanvasContent && (
                <>
                  {" "}
                  <OffcanvasHeader closeButton></OffcanvasHeader>
                  <OffcanvasBody>
                    <Stack direction="horizontal" gap={3} className="pb-2">
                      <Avatar className="header__avatar border rounded-circle" />
                      <Card className="border-0">
                        <CardTitle>Владислав</CardTitle>
                        <CardText>vlad.brok99@gmail.com</CardText>
                      </Card>
                    </Stack>
                    <Nav
                      activeKey={location.pathname}
                      className="d-flex flex-column gap-4 mt-5 px-4"
                    >
                      {MENU_LINKS.map((link, i) => (
                        <NavLink
                          eventKey={link.route}
                          onClick={() => goTo(link.route)}
                          className="header__link py-3 px-4 rounded-2 "
                          key={i}
                        >
                          {link.name}
                        </NavLink>
                      ))}
                    </Nav>
                  </OffcanvasBody>
                </>
              )}
            </Suspense>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  )
}
