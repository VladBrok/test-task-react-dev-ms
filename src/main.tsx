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
import { ROUTE_PATHS } from "./lib/shared-constants"
import ErrorBoundary from "./routes/errorBoundary"

const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.ROOT,
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: ROUTE_PATHS.ROOT,
        element: <Posts />,
      },
      {
        path: ROUTE_PATHS.USER + "/:id",
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
