import { useState } from "react"
import { LayerManger } from "../2d/LayerManger"
import { getRandomInt } from "../backend/misc"
import { allStates, baseArray, baseState, GeneratorArray, SelectableArray } from "../backend/types"
import { ContextButton } from "../components/ContextButton"

export function RandomWall(props: { grid: LayerManger }) {
    let [WallCount, SetWallCount] = useState(1)

    return (
        <div style={{
            position: "relative",
            display: "flex",
            margin: "4px",
            padding: "3px",
            flexDirection: "column",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "flex-start",
            border: "2px solid white",
            borderRadius: "2px",
        }}>
            <p style={{
                color: "white",
                padding: "0px",
                margin: "2px",
                userSelect: "none",
            }}>
                Generate
            </p>
            <input
                type="number"
                value={WallCount}
                onChange={(e: any) => {
                    SetWallCount(e.target.value)
                }}
                style={{
                    display: "flex",
                    textAlign: "center",
                    height: "20px",
                    width: "100px",
                    justifyContent: "flex-start",
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                    padding: "0px",
                    margin: "0px",
                    backgroundColor: "gray",
                    border: "2px solid white",
                }} />
            {
                GeneratorArray.map((tile) => {
                    return (
                        <ContextButton
                            style={{
                                width: "100%",
                                textAlign: "center",
                                padding: "0px",
                                margin: "0px",
                                border: "1px solid white",
                            }}
                            onMouseDown={() => {
                                for (let i = 0; i < WallCount; i++)
                                    SetRandomTile(tile as baseState, props.grid)
                            }}
                        >
                            {tile}
                        </ContextButton>
                    )
                })
            }
        </div>
    )
}

function SetRandomTile(setTo: baseState, grid: LayerManger) {
    let tile: allStates | false = "empty"
    let x = 0
    let y = 0
    for (let loop = 0; tile !== null && loop < 10; loop++) {
        x = getRandomInt(grid.getWidth())
        y = getRandomInt(grid.getHeight())
        tile = grid.getTop(x, y)
    }
    grid.BaseGrid.set(x, y, setTo)
}