import React, { Dispatch, SetStateAction, useEffect, useState } from "react"


export function ContextButton(props: {
    children: React.ReactNode
    context?: React.ReactNode
    contextStyle?: React.CSSProperties
    buttonStyle?: React.CSSProperties
    setButtonState?: Dispatch<SetStateAction<boolean>>
    onMouseDown?: () => void
    setHoverState?: Dispatch<SetStateAction<boolean>>
    onHover?: (Hover: boolean) => void
}) {
    const [Hover, setHover] = useState<boolean>(false)

    useEffect(() => {
        if (props.setHoverState)
            props.setHoverState(Hover)
        if (props.onHover)
            props.onHover(Hover)
    }, [Hover])

    return (
        <div style={{
            ...{
                position: "relative",
                display: "flex",
                margin: "4px",
                padding: "3px",
                flexDirection: "column",
                alignItems: "center",
                justifyItems: "center",
                justifyContent: "center",
                borderRadius: "6px",
                color: Hover ? "grey" : "white"
            }, ...props.buttonStyle
        }}
            onMouseEnter={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
            onMouseDown={() => {
                if (props.setButtonState)
                    props.setButtonState(true)
                if (props.onMouseDown)
                    props.onMouseDown()
            }}
        >
            {props.children}
            {
                props.context && Hover && (
                    <div style={{
                        ...{
                            position: "absolute",
                            whiteSpace: "nowrap",
                            backgroundColor: "black",
                            padding: "2px",
                            fontSize: "13px",
                            border: "2px solid white",
                            borderRadius: "6px",
                            color: "white",
                            userSelect: "none"
                        }, ...props.contextStyle
                    }}>
                        {props.context}
                    </div>
                )
            }
        </div >
    )
}