import { LayerManger } from "../2d/LayerManger";
import { Node } from "../nodes/NodeClass";
import { allStates, keyLike, Replaceable, Walkable, xy } from "./types";

export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

//TODO: make it not modify original
export function removeItem<K>(Array: K[], item: K): K[] {
    const index = Array.indexOf(item, 0);
    if (index > -1) {
        Array.splice(index, 1);
    }
    return Array
}

export function trueEqual(obj: any, obj2: any) {
    if (typeof obj !== typeof obj2)
        return false

    if (typeof obj !== "object")
        return obj === obj2
    else
        for (const iterator in obj) {
            if (!trueEqual(obj[iterator], obj2[iterator])) {
                return false
            }
        }

    return true
}

export function outOfBounds(x: number, y: number, width: number, height: number) {
    return x < 0 || y < 0 || x >= width || y >= height
}

export function isWalkable<T extends allStates | false>(tile: T): boolean {
    if (tile in Walkable)
        if (Walkable[tile as keyLike])
            return true

    if (tile === undefined)
        return true

    return false
}

export function isReplaceable<T extends allStates | false>(tile: T): boolean {
    if (tile in Replaceable)
        if (Replaceable[tile as keyLike])
            return true

    if (tile === undefined)
        return true

    return false
}

export function RenderSolved(grid: LayerManger, Path: Node<xy>[]) {
    while (true) {
        const node = Path.pop()
        if (!node)
            return
        if (!node.data)
            return

        grid.NavGrid.set(node.data.x, node.data.y, "solved")
    }
}