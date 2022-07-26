import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Selectable, SelectableArray, SwapTable } from "../backend/types"
import { ContextButton } from "../components/ContextButton"
import { SelectTile } from "../components/Tiles/SelectTile"
import { StyledTab } from "../components/StyledTab"

export function SelectTileTab(props: {
    selectorState: Selectable,
    setSelectorState: Dispatch<SetStateAction<Selectable>>
}) {

    return (
        <StyledTab title="Tile Selector">
            <SelectTile {...props} />
        </StyledTab>
    )
}