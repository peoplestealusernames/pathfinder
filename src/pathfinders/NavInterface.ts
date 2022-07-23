import { Node } from "../nodes/NodeClass"

export interface NavInterface<Data extends any> {
    readonly StartNode: Node<Data>
    readonly GoalNode: Node<Data>

    getSolved(): boolean

    getSolution(): false | Node<Data>[] //TODO: replace with get best path

    GeneratePath(): boolean

    StepPath(): boolean
}
