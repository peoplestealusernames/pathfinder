import { useState } from "react"
import { LayerManger } from "../2d/LayerManger"
import { getRandomInt, isReplaceable } from "../backend/misc"
import { baseState, Selectable } from "../backend/types"
import { ContextButton } from "../components/ContextButton"
import { TileGrabber } from "../components/TileGrabber"

export function RandomWall(props: { grid: LayerManger }) {
    let [WallCount, SetWallCount] = useState(1)
    const [SelectedTile, SetSelectedTile] = useState<Selectable>("wall")

    const [Override, setOverride] = useState(false)

    return (
        <div style={{
            position: "relative",
            display: "flex",
            height: "fit-content",
            width: "fit-content",
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
            <ContextButton style={{
                padding: "0px",
                margin: "3px",
                fontSize: "23px",
                borderBottom: "2px solid white",
                borderRadius: "0px",
            }}
                context={
                    `Generate ${WallCount}x random ${SelectedTile} tiles`
                }
                contextStyle={{
                    bottom: "-100%"
                }}
                onMouseDown={
                    () => {
                        SetRandomTile(SelectedTile as baseState, props.grid, Override)
                    }
                }
            >
                Generate
            </ContextButton>
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
                <TileGrabber
                    allowedStates={["empty", "wall"]}
                    selectorState={SelectedTile}
                    setSelectorState={SetSelectedTile}
                />
            }
            <ContextButton
                setButtonState={setOverride}
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

function SetRandomTile(setTo: baseState, grid: LayerManger, allowOveride: boolean) {
    for (let loop = 0; loop < 1000; loop++) {
        const x = getRandomInt(grid.getWidth())
        const y = getRandomInt(grid.getHeight())
        const tile = grid.getTop(x, y)
        if (isReplaceable(tile) && (allowOveride || tile !== setTo))
            return grid.BaseGrid.set(x, y, setTo)
    }
}