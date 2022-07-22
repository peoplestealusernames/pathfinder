import { CanvasManager } from "../2d/canvasManger";
import { LayerManger } from "../2d/LayerManger";
import { mazeGen } from "../2d/mazeGen";
import { NavGrid } from "../2d/navGrid";
import { GridToNode2d } from "../nodes/gridToNode";
import { ChangeDim } from "./ChangeDim";
import { RandomWall } from "./RandomWall";
import { SelectTile } from "./SelectTile";

export function Buttons(props: { grid: LayerManger, nav: NavGrid, canvas: CanvasManager }) {
    return (<div className="Buttons" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", width: "100vw" }}>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            <ChangeDim key="ChangeX" inputType="number" initValue={props.grid.getWidth()} setter={(width: number) => { props.grid.setWidth(width); props.canvas.reRender() }} />
            <ChangeDim key="ChangeY" inputType="number" initValue={props.grid.getHeight()} setter={(height: number) => { props.grid.setHeight(height); props.canvas.reRender() }} />
            <button style={{ alignSelf: "center", display: "flex" }}
                onClick={() => { props.nav.Reset(); props.grid.clear(); }}
            >Reset</button>
            <button style={{ width: 100, alignSelf: "center", display: "flex" }}
                onClick={() => { props.nav.Reset() }}
            >Remove Path</button>
        </div>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            <button style={{ alignSelf: "center", display: "flex" }}
                onClick={() => { props.nav.StepPath() }}
            >Step path</button>
            <button style={{ alignSelf: "center", display: "flex" }}
                onClick={() => { props.nav.TogglePath() }}
            >Toggle pathfinder</button>
            <button style={{ alignSelf: "center", display: "flex" }}
                onClick={() => { props.nav.GeneratePath() }}
            >Generate path</button>
        </div>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            <button style={{ alignSelf: "center", display: "flex" }}
                onClick={() => { mazeGen(props.grid) }}
            >Gen Maze!</button>
            <button style={{ alignSelf: "center", display: "flex" }}
                onClick={() => {
                    const nodeGrid = GridToNode2d(props.grid.BaseGrid, [[1, 0], [0, 1], [-1, 0], [0, -1]])
                    console.log(nodeGrid.get(1, 1));
                    console.log(nodeGrid);
                }}
            >Gen Nodes (test)</button>
        </div>
        <SelectTile />
        <RandomWall grid={props.grid} />
    </div>)
}