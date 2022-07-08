import { useState, useEffect } from "react";
import { CanvasGrid } from "../canvas";
import { NavGrid } from "../navGrid";
import { RandomWall } from "./RandomWall";

export function Buttons(props: { grid: CanvasGrid, nav: NavGrid }) {
    let [x, setX] = useState(75)
    let [y, setY] = useState(25)
    useEffect(() => { props.grid.setWidth(x) }, [x])
    useEffect(() => { props.grid.setHeight(y) }, [y])

    return (<div className="Buttons" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", width: "100vw" }}>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            <input type="number" value={x} onChange={(e: any) => { setX(e.target.value) }} style={{ width: 50 }} />
            <input type="number" value={y} onChange={(e: any) => { setY(e.target.value) }} style={{ width: 50 }} />
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
        </div>
        <RandomWall grid={props.grid} />
    </div>)
}