import { LayerManger } from "../2d/LayerManger";
import { Selectable } from "../backend/types";
import { ContextButton } from "../components/ContextButton";
import { StyledTab } from "../components/StyledTab";
import { NavInterface } from "../pathfinders/NavInterface";
import { IoMdSkipForward, IoMdPlay, IoMdPause } from "react-icons/io"
import { CgTimelapse } from "react-icons/cg";

export function NavMenu(props: {
    grid: LayerManger,
    nav: NavInterface<any>,
    selectorState: Selectable
}) {
    let Timer: NodeJS.Timer | undefined

    function RunPath() {
        if (!Timer) {
            Timer = setInterval(() => {
                if (props.nav.StepPath()) {
                    clearInterval(Timer)
                    Timer = undefined
                }
            }, 100)//TODO: pathfinder speed
        }
    }

    function StopPath() {
        clearInterval(Timer)
        Timer = undefined
    }


    return (
        <StyledTab title="NavMenu">
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
        </StyledTab>
    )
}
