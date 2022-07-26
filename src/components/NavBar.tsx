import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { CgTimelapse } from "react-icons/cg"
import { IoMdSkipForward, IoMdPlay, IoMdPause } from "react-icons/io"
import { LayerManger } from "../2d/LayerManger"
import { NavInterface } from "../pathfinders/NavInterface"
import { ContextButton } from "./ContextButton"

export function NavBar(props: {
    grid: LayerManger,
    nav: NavInterface<any>,
    style?: React.CSSProperties,
    timerState: [NodeJS.Timer | undefined, Dispatch<SetStateAction<NodeJS.Timer | undefined>>],
}) {
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
                buttonStyle={Style}
                context={"Step Path"}
                contextStyle={{ bottom: "-100%" }}
                onMouseDown={() => { props.nav.StepPath() }}
            >
                <IoMdSkipForward size={Size} />
            </ContextButton>
            <ContextButton
                buttonStyle={{ ...Style, ...{ color: "green" } }}
                context={"Play pathfinder"}
                contextStyle={{ bottom: "-100%" }}
                onMouseDown={() => { RunPath() }}
            >
                <IoMdPlay size={Size} />
            </ContextButton>
            <ContextButton
                buttonStyle={{ ...Style, ...{ color: "red" } }}
                context={"Stop pathfinder"}
                contextStyle={{ bottom: "-100%" }}
                onMouseDown={() => { StopPath() }}
            >
                <IoMdPause size={Size} />
            </ContextButton>
            <ContextButton
                buttonStyle={Style}
                context={"Generate Path"}
                contextStyle={{ bottom: "-100%" }}
                onMouseDown={() => { props.nav.GeneratePath() }}
            >
                <CgTimelapse size={Size} />
            </ContextButton>
        </div>
    )
}