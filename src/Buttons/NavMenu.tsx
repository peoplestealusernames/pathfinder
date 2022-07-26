import { LayerManger } from "../2d/LayerManger";
import { StyledTab } from "../components/StyledTab";
import { NavInterface } from "../pathfinders/NavInterface";
import { NavBar } from "../components/NavBar";
import { Dispatch, SetStateAction } from "react";

export function NavMenu(props: {
    grid: LayerManger,
    nav: NavInterface<any>,
    timerState: [NodeJS.Timer | undefined, Dispatch<SetStateAction<NodeJS.Timer | undefined>>],
}) {
    return (
        <StyledTab title="NavMenu" style={{ flexDirection: "column" }}>
            <NavBar {...props} />
        </StyledTab>
    )
}
