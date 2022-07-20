export type baseState = "wall" | "start" | "goal" | undefined //TODO: bias points
export type navState = "qued" | "checked" | "solved" | undefined

export type allStates = baseState | navState | "empty"
export type keyLike = Exclude<allStates, undefined>

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
    "start": false,
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
