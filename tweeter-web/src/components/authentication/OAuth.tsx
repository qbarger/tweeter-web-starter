import { IconName } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { OverlayTrigger, Tooltip } from "react-bootstrap"

interface Props {
    displayInfoMessageWithDarkBackground: (message: string) => void
    message: string
    select: string
}

const OAuth = (props: Props) => {
    let name!: IconName
    if(props.select == "Google"){
        name = "google"
    } else if(props.select == "Facebook"){
        name = "facebook"
    } else if(props.select == "Twitter"){
        name = "twitter"
    } else if(props.select == "LinkedIn"){
        name = "linkedin"
    } else if(props.select == "GitHub"){
        name = "github"
    }
    return (
        <button
            type="button"
            className="btn btn-link btn-floating mx-1"
            onClick={() =>
                props.displayInfoMessageWithDarkBackground(props.message)
            }
            >
            <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="googleTooltip">${props.select}</Tooltip>}
            >
                <FontAwesomeIcon icon={["fab", name]} />
            </OverlayTrigger>
        </button>
    )
}

export default OAuth