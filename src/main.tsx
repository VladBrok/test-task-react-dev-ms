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

// TODO: handle error (404, ...)
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Posts />,
      },
      {
        path: "/users/:id",
        element: <User />,
      },
      {
        path: "/about",
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
