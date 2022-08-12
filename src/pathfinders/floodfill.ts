import { TypedEventEmitter } from "../backend/events";
import { navState } from "../backend/types";
import { Node } from "../nodes/NodeClass";
import { NavInterface } from "./NavInterface";

type FloodFillEvents<T> = {
    update: (node: Node<T>, state: navState) => void
    solved: (solvedStack: Node<T>[]) => void
    reset: () => void
}

export class FloodFill<Data extends any> extends TypedEventEmitter<FloodFillEvents<Data>> implements NavInterface<Data> {
    private solved: boolean = false;
    private StartNode: Node<Data>
    private GoalNode: Node<Data>

    setStart(node: Node<Data>) {
        this.StartNode = node
        this.reset()
    }

    setGoal(node: Node<Data>) {
        this.GoalNode = node //TODO: update mechanism for nodes
    }

    constructor(StartNode: Node<Data>, GoalNode: Node<Data>) {
        super()
        this.StartNode = StartNode
        this.GoalNode = GoalNode
        this.reset()
    }

    reset(): void {
        this.solved = false
        this.SolutionPath = []
        this.Qued = [this.StartNode]
        this.WeightTable = {}
        this.WeightTable[this.StartNode.id] = 0
        this.emit("reset")
    }

    getSolution(): false | Node<Data>[] {
        if (!this.solved)
            return false

        return Array.from(this.SolutionPath)
    }

    private WeightTable: { [key: string]: number } = {}
    private CheckedTable: { [key: string]: boolean } = {}
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

        if (this.solved)
            return true

        console.log(`FloodFill:Step start:${this.Qued.length} nodes to process`);
        for (const element of this.Qued) {
            this.CheckedTable[element.id] = true
            for (const child of element.getChildren()) {
                const pathWeight = this.WeightTable[element.id] + child.weight
                if (child.id in this.WeightTable)
                    continue //Only returns true when it was already checked

                this.WeightTable[child.id] = pathWeight

                if (child === this.GoalNode) {
                    this.SolutionPath = this.MakePath(child)
                    this.solved = true
                    console.log("FloodFill:Step solution found");

                    if (this.SolutionPath) {
                        this.emit("solved", this.SolutionPath)
                    } else {
                        //TODO:PANIC
                    }
                    return true
                }

                this.emit("update", child, "qued")
                newQue.push(child)
            };

            this.emit("update", element, "checked")
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
        const arr = node.getParents().filter((e) => this.CheckedTable[e.id]).sort((a, b) => {
            return this.WeightTable[a.id] - this.WeightTable[b.id]
        })
        console.log(arr);


        if (!arr[0])
            throw new Error("PathfindingBacktrack: Chain was broken")

        return arr[0]
    }
}