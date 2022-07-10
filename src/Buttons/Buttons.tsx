import { CanvasGrid } from "../canvas";
import { mazeGen } from "../mazeGen";
import { NavGrid } from "../navGrid";
import { ChangeDim } from "./ChangeDim";
import { RandomWall } from "./RandomWall";
import { SelectTile } from "./SelectTile";

export function Buttons(props: { grid: CanvasGrid, nav: NavGrid }) {
    return (<div className="Buttons" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", width: "100vw" }}>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            <ChangeDim key="ChangeX" inputType="number" initValue={props.grid.getWidth()} setter={props.grid.setWidth.bind(props.grid)} />
            <ChangeDim key="ChangeY" inputType="number" initValue={props.grid.getHeight()} setter={props.grid.setHeight.bind(props.grid)} />
            <button style={{ alignSelf: "center", display: "flex" }}
                onClick={() => { props.grid.reset(); props.nav.Reset() }}
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
                onClick={() => {
                    let stri = ""
                    for (const row of props.grid.getGrid()) {
                        for (const cell of row) {
                            stri += cell + ","
                        }
                        stri += "\n"
                    }
                    console.log(stri);
                }}
            >Log Data</button>

            <button style={{ alignSelf: "center", display: "flex" }}
                onClick={() => {
                    let stri = ""
                    const Qued = props.nav.GetQued()
                    if (Qued) {
                        for (const Que of Qued) {
                            stri += JSON.stringify(Que.last())
                        }
                    } else {
                        stri += "Nothing qued"
                    }
                    console.log(stri);
                }}
            >Log Que</button>

            <button style={{ alignSelf: "center", display: "flex" }}
                onClick={() => { mazeGen(props.grid) }}
            >Gen Maze!</button>
        </div>
        <SelectTile />
        <RandomWall grid={props.grid} />
    </div>)
}