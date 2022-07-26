import React, { Dispatch, SetStateAction } from "react"
import { CgTimelapse } from "react-icons/cg"
import { IoMdSkipForward, IoMdPlay, IoMdPause } from "react-icons/io"
import { LayerManger } from "../2d/LayerManger"
import { NavInterface } from "../pathfinders/NavInterface"
import { ContextButton } from "./ContextButton"

export function NavBar(props: {
    grid: LayerManger,
    nav: NavInterface<any>,
    style?: React.CSSProperties,
    showContext?: boolean
    timerState: [NodeJS.Timer | undefined, Dispatch<SetStateAction<NodeJS.Timer | undefined>>],
}) {
    const ShowContext = props.showContext !== undefined ? props.showContext : true

    const [Timer, setTimer] = props.timerState

    function RunPath() {
        if (!Timer) {
            setTimer(setInterval(() => {
                if (props.nav.StepPath()) {
                    StopPath()
                }
            }, 100))
        }
    }

    function StopPath() {
        clearInterval(Timer)
        setTimer(undefined)
    }

    const Style = {
        margin: "2px",
        padding: "0px",
    }

    const Size = 20

    return (
        <div style={{
            ...{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }, ...props.style
        }}>
            <ContextButton
                style={Style}
                context={ShowContext ? "Step Path" : undefined}
                contextStyle={{ bottom: "-100%" }}
                onMouseDown={() => { props.nav.StepPath() }}
            >
                <IoMdSkipForward size={Size} />
            </ContextButton>
            <ContextButton
                style={{ ...Style, ...{ color: "green" } }}
                hoverStyle={{ color: "darkgreen" }}
                context={ShowContext ? "Play pathfinder" : undefined}
                contextStyle={{ bottom: "-100%" }}
                onMouseDown={() => { RunPath() }}
            >
                <IoMdPlay size={Size} />
            </ContextButton>
            <ContextButton
                style={{ ...Style, ...{ color: "red" } }}
                hoverStyle={{ color: "darkred" }}
                context={ShowContext ? "Stop pathfinder" : undefined}
                contextStyle={{ bottom: "-100%" }}
                onMouseDown={() => { StopPath() }}
            >
                <IoMdPause size={Size} />
            </ContextButton>
            <ContextButton
                style={Style}
                context={ShowContext ? "Generate Path" : undefined}
                contextStyle={{ bottom: "-100%" }}
                onMouseDown={() => { props.nav.GeneratePath() }}
            >
                <CgTimelapse size={Size} />
            </ContextButton>
        </div>
    )
}