import { LayerManger } from "../2d/LayerManger";
import { Selectable } from "../backend/types";
import { ContextButton } from "../components/ContextButton";
import { StyledTab } from "../components/StyledTab";
import { NavInterface } from "../pathfinders/NavInterface";
import { IoMdSkipForward, IoMdPlay, IoMdPause } from "react-icons/io"
import { CgTimelapse } from "react-icons/cg";
import { NavBar } from "../components/NavBar";

export function NavMenu(props: {
    grid: LayerManger,
    nav: NavInterface<any>
}) {
    return (
        <StyledTab title="NavMenu" style={{ flexDirection: "column" }}>
            <NavBar {...props} />
        </StyledTab>
    )
}
