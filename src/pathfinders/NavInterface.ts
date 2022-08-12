import { TypedEventEmitter } from "../backend/events"
import { navState, xy } from "../backend/types"
import { Node } from "../nodes/NodeClass"

export interface NavInterface<Data extends any> {
    getSolved(): boolean

    getSolution(): false | Node<Data>[] //TODO: replace with get best path

    GeneratePath(): boolean

    StepPath(): boolean

    RunPath(): void
    StopPath(): void

    reset(): void
}
