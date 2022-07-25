import { Dispatch, SetStateAction, useState } from "react"


export function TopBarButton(props: {
    children: React.ReactNode
    context: React.ReactNode
    setTrueState: Dispatch<SetStateAction<boolean>>
}) {
    const [Hover, setHover] = useState<boolean>(true)

    return (
        < button style={{
            position: "relative",
            margin: "2px",
            padding: "2px",
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "center",
            borderRadius: "6px"
        }}
            onMouseEnter={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
            onMouseDown={() => props.setTrueState(true)}
        >
            {props.children}
            {Hover && (
                <div style={{
                    position: "absolute",
                    whiteSpace: "nowrap",
                    top: "42px",
                    backgroundColor: "black",
                    padding: "2px",
                    fontSize: "13px",
                    border: "2px solid white",
                    color: "white"
                }}>
                    {props.context}
                </div>
            )
            }
        </button >
    )
}