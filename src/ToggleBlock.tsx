import { useEffect, useState } from "react"
import { SwapTable, Tile, validState } from "./types"


export function ToggleBlock(props: { tile: Tile, update: any }) {
    const x = props.tile.x
    const y = props.tile.y

    let [State, SetStateChild] = useState(props.tile.state)

    useEffect(() => {
        SetStateChild(props.tile.state)
        console.log("UPDATE")
    }, [props.tile.state])


    function SetState(val: validState) {
        console.log(`Update {${x},${y}} is now ${val}`)
        props.update()
        props.tile.state = val
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
            key={props.tile.state}
            onClick={Press}
            style={{
                backgroundColor: SwapTable[State],
                margin: 0,
                border: 'solid',
                borderWidth: '1px',
                width: 20, height: 20
            }}
        />
    )
}