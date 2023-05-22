import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getPosts } from "./postsSlice"

export default function PostList() {
  const posts = useAppSelector((state) => state.posts)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  return <div>{JSON.stringify(posts)}</div>
}
