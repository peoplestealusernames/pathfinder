import { MdOutlineClose } from "react-icons/md";

export function CloseButton(props: {
    onClose: () => void
}) {
    return (
        < div style={{
            position: "absolute",
            right: "3px",
            top: "3px",
        }}
            onClick={props.onClose}
        >
            <MdOutlineClose style={{
                position: "absolute",
                top: "0px",
                right: "0px",
                color: "grey"
            }} size={20} />
        </div >
    )
}