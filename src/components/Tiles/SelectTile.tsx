import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { allStates, keyLike, Selectable, SelectableArray, SwapTable } from "../../backend/types"
import { ContextButton } from "../ContextButton"
import { StyledTab } from "../StyledTab"
import { TileButton } from "./TileButton"

export function SelectTile(props: {
    selectorState?: Selectable,
    setSelectorState?: Dispatch<SetStateAction<Selectable>>,
    onClick?: (tile: Selectable) => void
}) {
    return (
        <div style={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center"
        }}
        >
            {
                SelectableArray.map((tile) => {
                    return (
                        <TileButton
                            key={`ToggleButton:${tile}`}
                            {...props}
                            tile={tile}
                        />
                    )
                })
            }
        </div>
    )
}
