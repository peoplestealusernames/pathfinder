import { LayerManger } from "../2d/LayerManger";
import { mazeGen } from "../2d/mazeGen";
import { ContextButton } from "../components/ContextButton";
import { StyledTab } from "../components/StyledTab";
import { NavInterface } from "../pathfinders/NavInterface";
import { RandomWall } from "./RandomWall";

export function MazeMenu(props: {
    grid: LayerManger,
    nav: NavInterface<any>,
}) {
    return (
        <StyledTab title="Obstacles Menu" style={{ margin: "2px", flexDirection: "row" }}>
            <div>
                <ContextButton style={{
                    border: "2px solid white",
                    borderRadius: "2px"
                }}
                    onMouseDown={() => { mazeGen(props.grid) }}
                >
                    Generate Maze!
                </ContextButton>
            </div>
            <RandomWall grid={props.grid} />
        </StyledTab >
    )
}