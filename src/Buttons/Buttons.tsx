import { CanvasGrid } from "../canvas";
import { mazeGen } from "../2d/mazeGen";
import { NavGrid } from "../2d/navGrid";
import { ChangeDim } from "./ChangeDim";
import { RandomWall } from "./RandomWall";
import { SelectTile } from "./SelectTile";

export function Buttons(props: { grid: CanvasGrid, nav: NavGrid }) {
    return (<div className="Buttons" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", width: "100vw" }}>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            <ChangeDim key="ChangeX" inputType="number" initValue={props.grid.getWidth()} setter={props.grid.setWidth.bind(props.grid)} />
            <ChangeDim key="ChangeY" inputType="number" initValue={props.grid.getHeight()} setter={props.grid.setHeight.bind(props.grid)} />
            <button style={{ alignSelf: "center", display: "flex" }}
                onClick={() => { props.nav.Reset(); props.grid.reset(); }}
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
        </div>
        <SelectTile />
        <RandomWall grid={props.grid} />
    </div>)
}