import { TypedEventEmitter } from "../backend/events";
import { navState, xy } from "../backend/types";
import { Node } from "../nodes/NodeClass";
import { NavInterface } from "./NavInterface";

export function FloodFillStepPath
    <Data extends xy, thisNode extends Node<Data>>(
        Qued: thisNode[],
        goal: thisNode,
        CheckedTable: { [key: string]: boolean },
        WeightTable: { [key: string]: number }
    ): [solved: boolean, newQued: thisNode[], checked: thisNode[]] {
    let newQue: thisNode[] = []
    let checked: thisNode[] = []

    console.log(`FloodFill:Step start:${Qued.length} nodes to process`);
    for (const element of Qued) {
        checked.push(element)
        CheckedTable[element.id] = true
        for (const child of element.getChildren() as thisNode[]) {
            const pathWeight = WeightTable[element.id] + child.weight
            if (child.id in WeightTable)
                continue //Only returns true when it was already checked

            WeightTable[child.id] = pathWeight

            if (child === goal) {
                console.log("FloodFill:Step solution found");

                return [true, [], [child, ...checked]]
            }

            newQue.push(child)
        };
    };

    console.log(`FloodFill:Step finish:${newQue.length} nodes now qued`);

    while (Qued.pop()) { }
    Qued.push(...newQue)
    return [false, newQue, checked]
}