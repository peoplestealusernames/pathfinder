import { Dispatch, SetStateAction } from "react"
import { Selectable } from "../backend/types"
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