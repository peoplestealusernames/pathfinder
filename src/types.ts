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

export const Walkable: { [k in validState]: boolean } = {
    "empty": true,
    "wall": false,
    "checked": false, // An extra bonus of this is it wont path over itself
    "qued": false,
    "goal": true,
    "solved": false,
    "start": true,
}

export class Tile {
    public state: validState
    public x: number
    public y: number

    constructor(x: number, y: number, state: validState) {
        this.state = state
        this.x = x
        this.y = y
    }
}

export class Vec2 {
    public x: number
    public y: number

    constructor(vec2: [number, number])
    constructor(x: number, y: number)
    public constructor(...params: any[]) {
        if (params.length === 2) {
            this.x = params[0]
            this.y = params[1]
        } else {
            this.x = params[0][0]
            this.y = params[0][1]
        }
    }

    public add(b: Vec2): Vec2 {
        return new Vec2(this.x + b.x, this.y + b.y)
    }

    public subtract(b: Vec2): Vec2 {
        return new Vec2(this.x - b.x, this.y - b.y)
    }
}

export class Path {
    public nodes: Vec2[] = []

    public add(node: Vec2) {
        this.nodes.push(node)
    }

    public last() {
        return this.nodes[this.nodes.length - 1]
    }

    public Branch() {
        let P = new Path()
        for (const node of this.nodes)
            P.add(node)

        return P
    }
}