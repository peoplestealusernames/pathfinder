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

    console.log(`A*:Step start:${Qued.length} nodes to process`);
    const element = Qued.pop()
    if (!element) {
        console.error("A*: Attemped to run but nothing was qued")
        return [false, Qued, []]
    }

    const checked: thisNode[] = [element]

    const Children = element.getChildren().filter((e) => !(WeightTable[e.id] > 0)) as thisNode[]

    if (Children.length > 0) {
        let child = Children.pop()
        if (!child)
            throw new Error("Impossible")
        let best = DistanceToFinish(child, goal)
        Children.forEach(e => {
            const current = DistanceToFinish(e, goal)
            if (current < best) {
                best = current
                child = e
            }
        })

        CheckedTable[element.id] = true
        const pathWeight = WeightTable[element.id] + child.weight
        WeightTable[child.id] = pathWeight

        if (child === goal) {
            console.log("A*:Step solution found");
            return [true, [], [child, ...checked]]
        }
        Qued.push(element, child)
    }

    console.log(`A*:Step finish:${Qued.length} nodes now qued`);

    return [false, Children, checked]
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