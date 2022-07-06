import { Dispatch, SetStateAction, useState } from "react"
import { ToggleBlock } from "./ToggleBlock"
import { validState } from "./types"

export function ToggleGrid(props: { x: number, y: number, grid: [validState[][], Dispatch<SetStateAction<validState[][]>>] }) {
    //TODO: make styles (including height from here pass to toggle block)

    return (
        <div style={{ margin: "0px", padding: "0px" }}>
            {
                [...Array(props.x)].map((v, i) => {
                    let x = i
                    return (<div key={`ButtonRow:${x}`} style={{ margin: "0px", padding: "0px", height: 20 }}>
                        {
                            [...Array(props.y)].map((v, y) => {
                                return (<ToggleBlock x={x} y={y} grid={props.grid} />)
                            })
                        }
                    </div>
                    )
                })
            }
        </div>
    )
}