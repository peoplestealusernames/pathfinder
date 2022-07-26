import { LayerManger } from "../2d/LayerManger"
import { isReplaceable } from "./misc"

export const baseArray = ["wall", "start", "goal"] as const
export const navArray = ["qued", "checked", "solved"] as const

export const SelectableArray = [/*"debug",*/"empty", "wall", "start", "goal"] as const
export const GeneratorArray = ["wall", "empty"] as const

export type baseState = (typeof baseArray[number] | undefined)
export type navState = (typeof navArray[number] | undefined)

export type Selectable = (typeof SelectableArray[number])
export type Generatable = (typeof GeneratorArray[number])

export type allStates = baseState | navState | "empty"
export type keyLike = Exclude<allStates, undefined>

export type xy = { x: number, y: number }

export const SwapTable: { [key in keyLike]: string } = {
    "empty": "grey",
    "wall": "red",
    "checked": "blue",
    "qued": "cyan",
    "goal": "green",
    "solved": "yellow",
    "start": "orange",
}

export const Replaceable: { [k in keyLike]: boolean } = {
    "empty": true,
    "wall": true,
    "checked": false,
    "qued": false,
    "goal": false,
    "solved": false,
    "start": false,
}

export const Walkable: { [k in keyLike]: boolean } = {
    "empty": true,
    "wall": false,
    "checked": false, // An extra bonus of this is it wont path over itself
    "qued": false,
    "goal": true,
    "solved": false,
    "start": true,
}

export const SelectableFnc: { [k in Selectable]:
    (x: number, y: number, grid: LayerManger, topTile: allStates) => void }
    = {
    /*"debug": (x, y, grid, topTile) => {
        console.log(`Top layer: ${topTile}\nBaseGrid: ${grid.BaseGrid.get(x, y)}\nNavGrid: ${grid.NavGrid.get(x, y)}`)
    },*/
    "wall": (x, y, grid, topTile) => {
        if (!isReplaceable(topTile)) return
        grid.BaseGrid.set(x, y, "wall", true)
    },
    "empty": (x, y, grid, topTile) => {
        if (!isReplaceable(topTile)) return
        grid.BaseGrid.set(x, y, undefined, true)
    },
    "start": (x, y, grid, topTile) => {
        if (!isReplaceable(topTile)) return
        grid.move(x, y, "start")
    },
    "goal": (x, y, grid, topTile) => {
        if (!isReplaceable(topTile)) return
        grid.move(x, y, "goal")
    },
}

export class Path {
    nodes: [number, number][] = []

    constructor()
    constructor(nodes: [number, number][])
    constructor(...args: any[]) {
        if (args[0]) {
            this.nodes = args[0]
        }
    }

    add(node: [number, number]) {
        this.nodes.push(node)
    }

    last() {
        return this.nodes[this.nodes.length - 1]
    }

    Branch() {
        let P = new Path()
        for (const node of this.nodes)
            P.add(node)

        return P
    }
}
