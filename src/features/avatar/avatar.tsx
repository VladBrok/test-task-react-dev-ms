import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"
import { ROUTE_PATHS } from "../../lib/shared-constants"

export interface IAvatarProps {
  userId?: number
  className?: string
}

export default function Avatar(props: IAvatarProps) {
  const navigate = useNavigate()

  return (
    <Button
      variant="link"
      onClick={() => navigate(`${ROUTE_PATHS.USER}/${props.userId}`)}
      className={props.className}
      disabled={!props.userId}
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
