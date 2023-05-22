import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getPosts } from "./postsSlice"

export default function PostList() {
  const posts = useAppSelector((state) => state.posts.list)
  const isLoading = useAppSelector((state) => state.posts.isLoading)
  const error = useAppSelector((state) => state.posts.error)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  return (
    <div>
      {JSON.stringify(posts)}, {JSON.stringify(isLoading)},{" "}
      {JSON.stringify(error)}
    </div>
  )
}
