import { Dispatch, SetStateAction } from "react"
import { Selectable } from "../../backend/types"
import { ContextButton } from "../ContextButton"
import { TileRender } from "./TileRender"

export function TileButton(props: {
    tile: Selectable,
    selectorState?: Selectable
    setSelectorState?: Dispatch<SetStateAction<Selectable>>
    onClick?: (tile: Selectable) => void
}) {
    return (
        <ContextButton
            style={{
                margin: "5px",
                userSelect: "none"
            }}
            onMouseDown={() => {
                if (props.setSelectorState)
                    props.setSelectorState(props.tile)
                if (props.onClick)
                    props.onClick(props.tile)
            }}
            context={props.tile}
        >
            <TileRender tile={props.tile}
                style={{
                    border: props.tile === props.selectorState ?
                        "3px solid darkgoldenrod" :
                        "3px solid white",
                }}
            />
        </ContextButton >
    )
}