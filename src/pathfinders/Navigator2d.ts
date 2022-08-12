import { TypedEventEmitter } from "../backend/events";
import { navState, xy } from "../backend/types";
import { NavInterface } from "./NavInterface";
import { Node } from "../nodes/NodeClass"

export type Nav2dEvents<T> = {
    update: (node: Node<T>, state: navState) => void
    solved: (solvedStack: Node<T>[]) => void
    reset: () => void
}

export type StepFNC2d<Data extends xy> = (
    Qued: Node<Data>[],
    goal: Node<Data>,
    CheckedTable: { [key: string]: boolean },
    WeightTable: { [key: string]: number }
) => [solved: boolean, newQued: Node<Data>[], checked: Node<Data>[]]

export class Navigator2d
    <
    Data extends xy,
    TPathfinder extends StepFNC2d<Data>
    >
    extends TypedEventEmitter<Nav2dEvents<Data>> implements NavInterface<Data>
{
    private solved: boolean = false;
    private StartNode: Node<Data>
    private GoalNode: Node<Data>
    private Timer: NodeJS.Timer | undefined

    RunPath() {
        if (!this.Timer) {
            this.Timer = (setInterval(() => {
                if (this.StepPath()) {
                    this.StopPath()
                }
            }, 100))
        }
    }

    StopPath() {
        clearInterval(this.Timer)
        this.Timer = undefined
    }

    setStart(node: Node<Data>) {
        this.StartNode = node
        this.reset()
    }

    setGoal(node: Node<Data>) {
        this.GoalNode = node //TODO: update mechanism for nodes
    }

    constructor(pathfinder: TPathfinder, StartNode: Node<Data>, GoalNode: Node<Data>) {
        super()
        this.StartNode = StartNode
        this.GoalNode = GoalNode
        this.reset()
        this.pathfinder = pathfinder
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

    private pathfinder: TPathfinder
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
        if (this.solved)
            return true

        let Checked: Node<Data>[] = [];
        let NewQued: Node<Data>[] = [];

        [this.solved, NewQued, Checked] = this.pathfinder(this.Qued, this.GoalNode, this.CheckedTable, this.WeightTable)

        NewQued.forEach(node => {
            this.emit("update", node, "qued")
        });
        Checked.forEach(node => {
            this.emit("update", node, "checked")
        });

        if (this.solved) {
            this.SolutionPath = this.MakePath(Checked[0])
            this.emit("solved", this.SolutionPath)
        }

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

        if (!arr[0])
            throw new Error("PathfindingBacktrack: Chain was broken")

        return arr[0]
    }
}