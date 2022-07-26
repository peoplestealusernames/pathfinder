import React, { Dispatch, SetStateAction, useState } from "react"


export function ContextButton(props: {
    children: React.ReactNode
    context?: React.ReactNode
    contextStyle?: React.CSSProperties
    style?: React.CSSProperties
    toggle?: boolean
    setButtonState?: Dispatch<SetStateAction<boolean>>
    onMouseDown?: () => void
    setHoverState?: Dispatch<SetStateAction<boolean>>
    onHover?: (Hover: boolean) => void
    pressedStyle?: React.CSSProperties
    hoverStyle?: React.CSSProperties
}) {
    //TODO: toggle button option
    const hoverStyle = props.hoverStyle ? props.hoverStyle : {}
    const pressedStyle = props.pressedStyle ? props.pressedStyle : {}

    const [Hover, setHoverState] = useState<boolean>(false)
    const [Pressed, setPressedState] = useState<boolean>(false)

    function setHover(state: boolean) {
        setHoverState(state)
        if (props.setHoverState)
            props.setHoverState(state)
        if (props.onHover)
            props.onHover(state)
    }

    function setPressed(state: boolean) {
        if (props.toggle && !state)
            return

        state = !Pressed

        setPressedState(state)
        if (props.setButtonState)
            props.setButtonState(state)
        if (props.onMouseDown)
            if (state)
                props.onMouseDown()
    }

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
                color: Hover ? "grey" : "white",
                userSelect: "none"
            }, ...props.style,
            ...Hover ? hoverStyle : {},
            ...Pressed ? pressedStyle : {},
        }}
            onMouseEnter={() => { setHover(true) }}
            onMouseLeave={() => { setHover(false) }}
            onMouseDown={() => { setPressed(true) }}
            onMouseUp={() => { setPressed(false) }}
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
                            fontSize: "12px",
                            border: "1px solid white",
                            borderRadius: "6px",
                            color: "white",
                        }, ...props.contextStyle
                    }}>
                        {props.context}
                    </div>
                )
            }
        </div >
    )
}