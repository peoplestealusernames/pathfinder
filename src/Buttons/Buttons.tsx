import { CanvasManager } from "../2d/canvasManger";
import { LayerManger } from "../2d/LayerManger";
import { mazeGen } from "../2d/mazeGen";
import { NavInterface } from "../pathfinders/NavInterface";
import { ChangeDim } from "./ChangeDim";
import { RandomWall } from "./RandomWall";
import { SelectTile } from "./SelectTile";

export function Buttons(props: { grid: LayerManger, nav: NavInterface<any> }) {
    let Timer: NodeJS.Timer | undefined

    return (<div className="Buttons" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", backgroundColor: "black", borderRadius: "20px", padding: "10px" }}>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            <ChangeDim key="ChangeX" inputType="number" initValue={props.grid.getWidth()} setter={(width: number) => { props.grid.setWidth(width) }} />
            <ChangeDim key="ChangeY" inputType="number" initValue={props.grid.getHeight()} setter={(height: number) => { props.grid.setHeight(height) }} />
            <button style={{ alignSelf: "center", display: "flex" }}
                onMouseDown={() => { props.grid.clear(); }}
            >Reset</button>
            <button style={{ width: 100, alignSelf: "center", display: "flex" }}
                onMouseDown={() => { props.nav.reset() }}
            >Remove Path</button>
        </div>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            <button style={{ alignSelf: "center", display: "flex" }}
                onMouseDown={() => { props.nav.StepPath() }}
            >Step path</button>
            <button style={{ alignSelf: "center", display: "flex" }}
                onMouseDown={() => {
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
                onMouseDown={() => { props.nav.GeneratePath() }}
            >Generate path</button>
        </div>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            <button style={{ alignSelf: "center", display: "flex" }}
                onMouseDown={() => { mazeGen(props.grid) }}
            >Gen Maze!</button>
        </div>
        <RandomWall grid={props.grid} />
    </div>)
}