import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { CgTimelapse } from "react-icons/cg"
import { IoMdSkipForward, IoMdPlay, IoMdPause } from "react-icons/io"
import { LayerManger } from "../2d/LayerManger"
import { NavInterface } from "../pathfinders/NavInterface"
import { ContextButton } from "./ContextButton"

export function NavBar(props: {
    grid: LayerManger,
    nav: NavInterface<any>,
    runState?: [boolean, Dispatch<SetStateAction<boolean>>],
}) {
    useEffect(() => {
        if (!props.runState)
            return

        if (props.runState[0])
            RunPath()
        else if (props.runState[1])
            StopPath()
    }, [props.runState ? props.runState[0] : undefined])

    const UpdateRunState = props.runState ? props.runState[1] : (dump: boolean) => { }

    const [Timer, setTimer] = useState<NodeJS.Timer | undefined>(undefined)

    function RunPath() {
        if (!Timer) {
            setTimer(setInterval(() => {
                if (props.nav.StepPath()) {
                    StopPath()
                }
            }, 100))//TODO: pathfinder speed
            UpdateRunState(true)
        }
    }

    function StopPath() {
        clearInterval(Timer)
        setTimer(undefined)
        UpdateRunState(false)
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <ContextButton
                context={"Step Path"}
                contextStyle={{ bottom: "-100%" }}
                onMouseDown={() => { props.nav.StepPath() }}
            >
                <IoMdSkipForward />
            </ContextButton>
            <ContextButton
                context={"Play pathfinder"}
                contextStyle={{ bottom: "-100%" }}
                buttonStyle={{ color: "green" }}
                onMouseDown={() => { RunPath() }}
            >
                <IoMdPlay />
            </ContextButton>
            <ContextButton
                context={"Stop pathfinder"}
                contextStyle={{ bottom: "-100%" }}
                buttonStyle={{ color: "red" }}
                onMouseDown={() => { StopPath() }}
            >
                <IoMdPause />
            </ContextButton>
            <ContextButton
                context={"Generate Path"}
                contextStyle={{ bottom: "-100%" }}
                onMouseDown={() => { props.nav.GeneratePath() }}
            >
                <CgTimelapse />
            </ContextButton>
        </div>
    )
}