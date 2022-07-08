export type validState = "empty" | "checked" | "qued" | "wall" | "goal" | "solved" | "start"

export const SwapTable: { [k in validState]: string } = {
    "empty": "grey",
    "wall": "red",
    "checked": "blue",
    "qued": "cyan",
    "goal": "green",
    "solved": "yellow",
    "start": "orange",
}

export const Replaceable: { [k in validState]: boolean } = {
    "empty": true,
    "wall": true,
    "checked": false,
    "qued": false,
    "goal": false,
    "solved": false,
    "start": false,
}

export const Walkable: { [k in validState]: boolean } = {
    "empty": true,
    "wall": false,
    "checked": false, // An extra bonus of this is it wont path over itself
    "qued": false,
    "goal": true,
    "solved": false,
    "start": false,
}

export const allowOne: validState[] = ["start", "goal"]

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
