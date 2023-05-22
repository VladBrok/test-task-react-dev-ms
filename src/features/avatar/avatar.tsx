import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"
import { ROUTE_PATHS } from "../../lib/shared"

export interface IAvatarProps {
  userId?: number
  className?: string
}

export default function Avatar(props: IAvatarProps) {
  const navigate = useNavigate()

  return (
    <Button
      variant="link"
      onClick={() =>
        props.userId && navigate(`${ROUTE_PATHS.USER}/${props.userId}`)
      }
      className={props.className}
    >
      {" "}
      <Image
        fluid
        src="/images/placeholder.jpg"
        roundedCircle
        style={{ objectFit: "cover" }}
      />
    </Button>
  )
}
