import { CanvasManager } from "../2d/canvasManger";
import { LayerManger } from "../2d/LayerManger";
import { mazeGen } from "../2d/mazeGen";
import { GridToNode2d } from "../nodes/gridToNode";
import { NavInterface } from "../pathfinders/NavInterface";
import { ChangeDim } from "./ChangeDim";
import { RandomWall } from "./RandomWall";
import { SelectTile } from "./SelectTile";

export function Buttons(props: { grid: LayerManger, nav: NavInterface<any>, canvas: CanvasManager }) {
    let Timer: NodeJS.Timer | undefined
    return (<div className="Buttons" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", width: "100vw" }}>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            <ChangeDim key="ChangeX" inputType="number" initValue={props.grid.getWidth()} setter={(width: number) => { props.grid.setWidth(width); props.canvas.reRender() }} />
            <ChangeDim key="ChangeY" inputType="number" initValue={props.grid.getHeight()} setter={(height: number) => { props.grid.setHeight(height); props.canvas.reRender() }} />
            <button style={{ alignSelf: "center", display: "flex" }}
                onClick={() => { props.grid.clear(); }}
            >Reset</button>
            <button style={{ width: 100, alignSelf: "center", display: "flex" }}
                onClick={() => { props.nav.reset() }}
            >Remove Path</button>
        </div>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            <button style={{ alignSelf: "center", display: "flex" }}
                onClick={() => { props.nav.StepPath() }}
            >Step path</button>
            <button style={{ alignSelf: "center", display: "flex" }}
                onClick={() => {
                    if (!Timer) {
                        Timer = setInterval(() => {
                            if (props.nav.StepPath()) {
                                clearInterval(Timer)
                                Timer = undefined
                            }
                        }, 100)
                    } else {
                        clearInterval(Timer)
                        Timer = undefined
                    }
                }}
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