import { useState } from "react"
import { validState } from "../backend/types"

export function SelectTile() {
    let [selected, setSelected] = useState<validState>("empty")

    return (
        <div id={"Block selector"} data-value={selected}
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
            <style>{`
                .on {background-Color:red}
                .off {background-Color:grey}
                `}</style>
            {(["empty", "wall", "start", "goal"] as validState[]).map((tile: validState) => {
                return (
                    <button key={`ToggleButton:${tile}`} style={{ alignSelf: "center", display: "flex" }} onClick={(e: any) => {
                        setSelected(tile)
                    }} className={selected === tile ? "on" : "off"}>
                        {tile}
                    </button>
                )
            })
            }
        </div >
    )
}