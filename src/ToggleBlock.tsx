import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { SwapTable, validState } from "./types"


export function ToggleBlock(props: { x: number, y: number, grid: [validState[][], Dispatch<SetStateAction<validState[][]>>] }) {
    const x = props.x
    const y = props.y
    const SetGrid = props.grid[1]

    let GridParent = props.grid[0]
    let StateParent = GridParent[x][y]

    let [State, SetStateChild] = useState(StateParent)

    useEffect(() => {
        SetStateChild(props.grid[0][x][y])
    }, [props.grid[0][x][y]])


    function SetState(val: validState) {
        console.log(`Update {${x},${y}} is now ${val}`)
        GridParent[x][y] = val
        SetGrid(GridParent)
        SetStateChild(val)
    }

    function Press() {
        if (State === "empty") {
            SetState("wall")
        }
        if (State === "wall") {
            SetState("empty")
        }
    }

    return (
        <button
            key={`Button:${x},${y}`}
            onClick={Press}
            style={{
                backgroundColor: SwapTable[props.grid[0][props.x][props.y]],
                margin: 0,
                border: 'solid',
                borderWidth: '1px',
                width: 20, height: 20
            }}
        />
    )
}