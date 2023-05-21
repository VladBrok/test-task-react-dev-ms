import "bootstrap/dist/css/bootstrap.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import "./index.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Posts from "./routes/posts"
import Layout from "./routes/layout"
import User from "./routes/user"
import About from "./routes/about"
import { ROUTE_PATHS } from "./lib/shared"

// TODO: handle error (404, ...)
const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.ROOT,
    element: <Layout />,
    children: [
      {
        path: ROUTE_PATHS.ROOT,
        element: <Posts />,
      },
      {
        path: ROUTE_PATHS.USER,
        element: <User />,
      },
      {
        path: ROUTE_PATHS.ABOUT,
        element: <About />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
