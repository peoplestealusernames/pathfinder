import { Dispatch, SetStateAction, useState } from "react"


export function ContextButton(props: {
    children: React.ReactNode
    context?: React.ReactNode
    setTrueState: Dispatch<SetStateAction<boolean>>
}) {
    const [Hover, setHover] = useState<boolean>(false)

    return (
        <div style={{
            position: "relative",
            margin: "4px",
            padding: "3px",
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
            color: Hover ? "grey" : "white"
        }}
            onMouseEnter={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
            onMouseDown={() => props.setTrueState(true)}
        >
            {props.children}
            {
                props.context && Hover && (
                    <div style={{
                        position: "absolute",
                        whiteSpace: "nowrap",
                        top: "43px",
                        backgroundColor: "black",
                        padding: "2px",
                        fontSize: "13px",
                        border: "2px solid white",
                        borderRadius: "6px",
                        color: "white"
                    }}>
                        {props.context}
                    </div>
                )
            }
        </div >
    )
}