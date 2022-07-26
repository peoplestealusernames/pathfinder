import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { allStates, keyLike, Selectable, SelectableArray, SwapTable } from "../backend/types"
import { ContextButton } from "./ContextButton"
import { StyledTab } from "./StyledTab"

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
            <TileRender tile={props.tile} ID={`Selector:${props.tile}:Canvas`}
                style={{
                    border: props.tile === props.selectorState ?
                        "3px solid darkgoldenrod" :
                        "3px solid white",
                }}
            />
        </ContextButton >
    )
}

export function TileRender(props: {
    tile: keyLike,
    ID: string,
    style?: React.CSSProperties
}) {
    const ID = props.ID

    useEffect(() => {
        const canvas = document.getElementById(ID) as HTMLCanvasElement

        if (!canvas)
            throw new Error("Could not find canvas")

        const context = canvas.getContext("2d")

        if (!context)
            throw new Error("Could not find context")

        const img = new Image()
        context.drawImage(img, 0, 0)

        context.fillStyle = "black"
        context.fillRect(0, 0, 10, 10)
        context.fillStyle = SwapTable[props.tile]
        context.fillRect(1, 1, 8, 8)

        const scaleFactor = Math.min(canvas.width, canvas.height)
        context.scale(scaleFactor / 10 * 2, scaleFactor / 10)
    }, [ID, props.tile])

    return (
        <canvas style={{
            ...{
                display: "flow",
                width: "50px",
                height: "50px",
                border: "3px solid white",
                margin: "0px",
            }, ...props.style
        }}
            id={ID}
        />
    )
}