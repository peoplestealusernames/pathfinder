import { useState } from "react"
import { LayerManger } from "../2d/LayerManger"
import { getRandomInt } from "../backend/misc"
import { allStates } from "../backend/types"

export function RandomWall(props: { grid: LayerManger }) {
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

function SetRandomWall(grid: LayerManger) {
    let tile: allStates | false = "empty"
    let x = 0
    let y = 0
    for (let loop = 0; tile !== null && loop < 10; loop++) {
        x = getRandomInt(grid.getWidth())
        y = getRandomInt(grid.getHeight())
        tile = grid.getTop(x, y)
    }
    grid.BaseGrid.set(x, y, "wall")
}