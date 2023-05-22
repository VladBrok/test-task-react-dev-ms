import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getPosts } from "./postsSlice"

export interface IPostListProps {
  userId?: number
}

export default function PostList(props: IPostListProps) {
  const posts = useAppSelector((state) => state.posts.list)
  const isLoading = useAppSelector((state) => state.posts.isLoading)
  const error = useAppSelector((state) => state.posts.error)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPosts(props.userId))
  }, [dispatch, props.userId])

  return (
    <div>
      {JSON.stringify(posts)}, {JSON.stringify(isLoading)},{" "}
      {JSON.stringify(error)}
    </div>
  )
}
