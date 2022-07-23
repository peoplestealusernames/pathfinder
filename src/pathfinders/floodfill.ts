import { Node } from "../nodes/NodeClass";
import { NavInterface } from "./NavInterface";

export class FloodFill<Data extends any> implements NavInterface<Data> {
    private solved: boolean = false;
    readonly StartNode: Node<Data>
    readonly GoalNode: Node<Data>

    constructor(StartNode: Node<Data>, GoalNode: Node<Data>) {
        this.StartNode = StartNode
        this.GoalNode = GoalNode
        this.Qued = [StartNode]

        this.WeightTable[StartNode.id] = 0
    }

    getSolution(): false | Node<Data>[] {
        if (!this.solved)
            return false

        return this.SolutionPath
    }

    private WeightTable: { [key: string]: number } = {}
    private Qued: Node<Data>[] = []
    private SolutionPath: Node<Data>[] = []

    getSolved(): boolean {
        return this.solved
    }

    GeneratePath(): boolean {
        while (this.Qued.length > 0 && !this.solved) {
            this.StepPath()
        }
        return this.solved
    }

    StepPath(): boolean {
        let newQue: Node<Data>[] = []

        console.log(`FloodFill:Step start:${this.Qued.length} nodes to process`);
        for (const element of this.Qued) {
            for (const child of element.getChildren()) {
                const pathWeight = this.WeightTable[element.id] + child.weight
                if (child.id in this.WeightTable)
                    continue //Only returns true when it was already checked

                this.WeightTable[child.id] = pathWeight

                if (child === this.GoalNode) {
                    this.SolutionPath = this.MakePath(child)
                    this.solved = true
                    console.log("FloodFill:Step solution found");

                    return true
                }

                newQue.push(child)
            };
        };

        console.log(`FloodFill:Step finish:${newQue.length} nodes now qued`);
        this.Qued = newQue

        return false
    }

    private MakePath(lastNode: Node<Data>) {
        let cNode = lastNode
        let Ret: Node<Data>[] = []
        while (cNode !== this.StartNode) {
            Ret.push(cNode)
            cNode = this.LeastHeavyParent(cNode)
        }
        Ret.push(cNode)
        return Ret
    }


    private LeastHeavyParent(node: Node<Data>) {
        const parents = node.getParents()
        let weight = this.WeightTable[parents[0].id]
        let best = parents[0]
        for (const Parent of parents) {
            const nodeWeight = this.WeightTable[Parent.id]
            if (weight > nodeWeight) {
                best = Parent
                weight = nodeWeight
            }
        }

        return best
    }
}