import { useEffect, useState } from "react";
import { xy } from "./backend/types";


export function FollowMouse(props: {//TODO: center div
    xOffset?: number,
    yOffset?: number,
    children?: React.ReactNode
}) {
    const xOffset = props.xOffset ? props.xOffset : 0
    const yOffset = props.yOffset ? props.yOffset : 0

    const [Pos, setPos] = useState<xy>({ x: 0, y: 0 })

    const MouseMove = (e: MouseEvent) => {
        setPos({ x: e.pageX, y: e.pageY })
    }

    useEffect(() => {
        window.addEventListener("mousemove", MouseMove)

        return (() => {
            window.removeEventListener("mousemove", MouseMove)
        })
    }, [])

    return (
        <div style={{
            position: "absolute",
            display: "flex",
            left: `${Pos.x + xOffset}px`,
            top: `${Pos.y + yOffset}px`,
            userSelect: "none"
        }}>
            {props.children}
        </div>
    )
}