import { TypedEventEmitter } from "../backend/events";
import { navState, xy } from "../backend/types";
import { Node } from "../nodes/NodeClass";
import { NavInterface } from "./NavInterface";

//Qued, GoalNode, CheckedTable, WeightTable)
export function AStarStepPath
    <Data extends xy, thisNode extends Node<Data>>(
        Qued: thisNode[],
        goal: thisNode,
        CheckedTable: { [key: string]: boolean },
        WeightTable: { [key: string]: number }
    ): [solved: boolean, newQued: thisNode[], checked: thisNode[]] {

    const element = Qued.pop()
    if (!element) {
        console.error("A*: Attemped to run but nothing was qued")
        return [false, Qued, []]
    }

    const newQue: thisNode[] = []
    const checked: thisNode[] = [element]

    const Children = element.getChildren().sort((a, b) => DistanceToFinish(a, goal) - DistanceToFinish(b, goal)) as thisNode[]

    CheckedTable[element.id] = true

    console.log(`A*:Step start:${Qued.length} nodes to process`);
    for (const child of Children.reverse()) {
        const pathWeight = WeightTable[element.id] + child.weight
        if (child.id in WeightTable)
            continue //Only returns true when it was already checked
        WeightTable[child.id] = pathWeight

        if (child === goal) {
            console.log("A*:Step solution found");
            return [true, [], [child, ...checked]]
        }

        newQue.push(child)
    };

    Qued.push(...newQue)
    console.log(`A*:Step finish:${Qued.length} nodes now qued`);

    return [false, Qued, checked]
}

function DistanceToFinish
    <Data extends xy>(
        node: Node<Data>,
        goalNode: Node<Data>
    ): number {
    return Math.sqrt(
        Math.pow((goalNode.data.x - node.data.x), 2)
        +
        Math.pow((goalNode.data.y - node.data.y), 2)
    )
}