import { useState } from "react"
import { LayerManger } from "../2d/LayerManger"
import { getRandomInt, isReplaceable } from "../backend/misc"
import { allStates, baseArray, baseState, GeneratorArray, Replaceable, SelectableArray } from "../backend/types"
import { ContextButton } from "../components/ContextButton"

export function RandomWall(props: { grid: LayerManger }) {
    let [WallCount, SetWallCount] = useState(1)

    let allowOveride = false

    return (
        <div style={{
            position: "relative",
            display: "flex",
            margin: "4px",
            padding: "7px",
            flexDirection: "column",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "flex-start",
            border: "2px solid white",
            borderRadius: "2px",
            fontSize: "20px",
        }}>
            <p style={{
                color: "white",
                padding: "0px",
                margin: "3px",
                userSelect: "none",
                fontSize: "23px",
                borderBottom: "2px solid white",
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
                    width: "80px",
                    justifyContent: "flex-start",
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                    padding: "0px",
                    margin: "3px",
                    backgroundColor: "gray",
                    borderRadius: "10px",
                    border: "2px solid white",
                }} />
            {
                GeneratorArray.map((tile) => {
                    return (
                        <ContextButton
                            style={{
                                width: "100%",
                                textAlign: "center",
                                padding: "1px",
                                margin: "3px",
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
            <ContextButton
                toggle={true}
                context={
                    "Allow tiles to overide they're own type"
                }
                contextStyle={{
                    bottom: "-120%"
                }}
                style={{
                    width: "100%",
                    padding: "0px",
                    margin: "0px",
                    border: "1px solid white",
                    backgroundColor: "darkgreen"
                }}
                pressedStyle={{
                    backgroundColor: "darkred",
                    color: "white"
                }}
            >
                Overides
            </ContextButton>
        </div >
    )
}

function SetRandomTile(setTo: baseState, grid: LayerManger) {
    for (let loop = 0; loop < 100; loop++) {
        const x = getRandomInt(grid.getWidth())
        const y = getRandomInt(grid.getHeight())
        const tile = grid.getTop(x, y)
        if (isReplaceable(tile) && tile !== setTo)
            return grid.BaseGrid.set(x, y, setTo)
    }
}