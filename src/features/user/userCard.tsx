import Container from "react-bootstrap/Container"
import PostList from "../posts/postList"

export interface IUserCardProps {
  userId: number
}

export default function UserCard(props: IUserCardProps) {
  return (
    <Container
      fluid
      className="d-flex p-0 mt-5 pt-2"
      style={{ height: "calc(100vh - 48px)", overflow: "hidden" }}
    >
      <div style={{ flex: "1 1 30%" }} className="border-end">
        user # {props.userId}
      </div>
      <div style={{ overflowY: "auto", flex: "1 1 70%" }}>
        <PostList userId={props.userId} />
      </div>
    </Container>
  )
}
