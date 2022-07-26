import { LayerManger } from "../2d/LayerManger";
import { mazeGen } from "../2d/mazeGen";
import { ContextButton } from "../components/ContextButton";
import { StyledTab } from "../components/StyledTab";
import { NavInterface } from "../pathfinders/NavInterface";
import { RandomWall } from "./RandomWall";
import { GiMaze } from "react-icons/gi";

const Style = {
    border: "2px solid white",
    borderRadius: "2px",
}

export function MazeMenu(props: {
    grid: LayerManger,
    nav: NavInterface<any>,
}) {
    return (
        <StyledTab title="Obstacles Menu" style={{ margin: "2px", flexDirection: "row" }}>
            <span style={{ flexDirection: "column", margin: "0px" }}>
                <StyledTab title="Clear Gird"
                    titleStyle={{
                        margin: "2px",
                        borderBottom: "none",
                        fontSize: "19",
                    }}
                    style={{
                        alignSelf: "center",
                        width: "fit-content",
                        flexDirection: "column",
                        margin: "2px"
                    }}
                    masterStyle={{ padding: "8px", margin: "5px" }}
                >
                    <ContextButton style={{ ...Style, margin: "-1px" }}
                        onMouseDown={() => { props.grid.NavGrid.clear() }}
                    >
                        Navigation
                    </ContextButton>
                    <ContextButton style={{ ...Style, margin: "-1px" }}
                        onMouseDown={() => { props.grid.BaseGrid.clear() }}
                    >
                        Tiles
                    </ContextButton>
                    <ContextButton style={{ ...Style, margin: "-1px" }}
                        onMouseDown={() => { props.grid.clear() }}
                    >
                        All
                    </ContextButton>
                </StyledTab>
                <ContextButton style={{ ...Style, flex: 1, margin: "5px" }}
                    onMouseDown={() => { mazeGen(props.grid) }}
                    context={"Generate Maze"}
                >
                    <GiMaze size={35} />
                </ContextButton>
            </span>
            <RandomWall grid={props.grid} />
        </StyledTab >
    )
}