import { TypedEventEmitter } from "../backend/events";
import { navState, xy } from "../backend/types";
import { Node } from "../nodes/NodeClass";
import { NavInterface } from "./NavInterface";

type AStarEvents<T> = {
    update: (node: Node<T>, state: navState) => void
    solved: (solvedStack: Node<T>[]) => void
    reset: () => void
}

export class AStar<Data extends xy> extends TypedEventEmitter<AStarEvents<Data>> implements NavInterface<Data> {
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

        console.log(`A*:Step start:${this.Qued.length} nodes to process`);

        const element = this.Qued.pop()
        if (!element) {
            console.error("A*: Attemped to run but nothing was qued")
            return false
        }

        const Children = element.getChildren().sort((a, b) => this.DistanceToFinish(a) - this.DistanceToFinish(b))

        this.CheckedTable[element.id] = true

        for (const child of Children) {
            const pathWeight = this.WeightTable[element.id] + child.weight
            if (child.id in this.WeightTable)
                continue //Only returns true when it was already checked
            this.WeightTable[child.id] = pathWeight

            if (child === this.GoalNode) {
                console.log("A*:Step solution found");
                this.solved = true
                this.SolutionPath = this.MakePath(child)

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

        console.log(this.WeightTable);


        this.emit("update", element, "checked")

        console.log(`A*:Step finish:${newQue.length} nodes now qued`);
        this.Qued.push(...newQue)

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

    private DistanceToFinish(node: Node<Data>) {
        return Math.sqrt(
            Math.pow((this.StartNode.data.x - node.data.x), 2)
            +
            Math.pow((this.StartNode.data.y - node.data.y), 2)
        )
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