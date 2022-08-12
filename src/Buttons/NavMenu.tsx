import { LayerManger } from "../2d/LayerManger";
import { StyledTab } from "../components/StyledTab";
import { NavInterface } from "../pathfinders/NavInterface";
import { NavBar } from "../components/NavBar";
import { Dispatch, SetStateAction, useState } from "react";
import { StepFNC2d } from "../pathfinders/Navigator2d";
import { xy } from "../backend/types";
import { AStarStepPath } from "../pathfinders/AStar";
import { FloodFillStepPath } from "../pathfinders/floodfill";

const PathfinderTable: { Name: string, FNC: StepFNC2d<xy> }[] = [
    { Name: "A*", FNC: AStarStepPath },
    { Name: "Flood Fill", FNC: FloodFillStepPath }
]

export function NavMenu(props: {
    grid: LayerManger,
    nav: NavInterface<any>,
    timerState: [NodeJS.Timer | undefined, Dispatch<SetStateAction<NodeJS.Timer | undefined>>],
}) {
    const [pathfinder, setpathfinder] = useState<typeof PathfinderTable[number]["Name"]>("A*") //TODO: Grabber

    function pathfinderChange(name: string) {
        const find = PathfinderTable.find((option) => option.Name === name)
        if (!find)
            return
        setpathfinder(find.Name)
        props.nav.setPathFinder(find.FNC)
    }

    return (
        <StyledTab title="NavMenu" style={{ flexDirection: "column" }}>
            <NavBar {...props} />
            <select value={pathfinder} onChange={(e) => pathfinderChange(e.target.value)}>
                {PathfinderTable.map((e, i) =>
                    <option key={i} value={e.Name}>{e.Name}</option>
                )}
            </select>
        </StyledTab >
    )
}
