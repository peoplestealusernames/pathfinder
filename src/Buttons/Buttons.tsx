import { CanvasManager } from "../2d/canvasManger";
import { LayerManger } from "../2d/LayerManger";
import { mazeGen } from "../2d/mazeGen";
import { NavInterface } from "../pathfinders/NavInterface";
import { ChangeDim } from "./ChangeDim";
import { RandomWall } from "./RandomWall";
import { SelectTile } from "./SelectTile";

export function Buttons(props: { grid: LayerManger, nav: NavInterface<any> }) {

    return (<div className="Buttons" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", backgroundColor: "black", borderRadius: "20px", padding: "10px" }}>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        </div>
    </div>)
}