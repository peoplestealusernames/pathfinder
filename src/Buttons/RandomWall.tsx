import { useState } from "react"
import { CanvasGrid } from "../canvas"
import { validState } from "../types"

export function RandomWall(props: { grid: CanvasGrid }) {
    let [WallCount, SetWallCount] = useState(1)

    return (<div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        <input type="number" value={WallCount} onChange={(e: any) => { SetWallCount(e.target.value) }}
            style={{ width: 50, WebkitAppearance: "none", MozAppearance: "textfield", padding: 0, }} />
        <button style={{ alignSelf: "center", display: "flex" }}
            onClick={() => {
                for (let i = 0; i < WallCount; i++)
                    SetRandomWall(props.grid)
            }}
        >
            x walls
        </button>
    </div>)
}

function SetRandomWall(grid: CanvasGrid) {
    let tile: validState | null = null
    let x = 0
    let y = 0
    for (let loop = 0; tile !== "empty" && loop < 10; loop++) {
        x = getRandomInt(grid.getWidth())
        y = getRandomInt(grid.getHeight())
        tile = grid.get(x, y)
    }
    grid.set(x, y, "wall")
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}