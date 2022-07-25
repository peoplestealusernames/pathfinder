import { LayerManger } from "../2d/LayerManger";
import { mazeGen } from "../2d/mazeGen";
import { NavInterface } from "../pathfinders/NavInterface";
import { RandomWall } from "./RandomWall";


export function MazeMenu(props: {
    grid: LayerManger,
    nav: NavInterface<any>,
}) {
    return (<div
        style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "10px",
            border: "10px solid black",
        }}>
        <button style={{ alignSelf: "center", display: "flex" }}
            onMouseDown={() => { mazeGen(props.grid) }}
        >Gen Maze!</button>
        <RandomWall grid={props.grid} />
    </div>)
}