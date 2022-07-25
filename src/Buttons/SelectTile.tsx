import { Dispatch, SetStateAction, useState } from "react"
import { Selectable, SelectableArray } from "../backend/types"

export function SelectTile(props: {
    selectorState: Selectable,
    setSelectorState: Dispatch<SetStateAction<Selectable>>
}) {

    return (
        <div id={"Block selector"} data-value={props.selectorState}
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            <style>{`
                .on {background-Color:red}
                .off {background-Color:grey}
                `}</style>
            {SelectableArray.map((tile: Selectable) => {
                return (
                    <button key={`ToggleButton:${tile}`} style={{ alignSelf: "center", display: "flex" }} onMouseDown={(e: any) => {
                        props.setSelectorState(tile)
                    }} className={props.selectorState === tile ? "on" : "off"}>
                        {tile}
                    </button>
                )
            })
            }
        </div >
    )
}