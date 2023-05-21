import { Outlet } from "react-router-dom"
import Header from "../features/header/header"

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
