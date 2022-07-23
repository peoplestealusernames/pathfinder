import EventEmitter from "events";

export class TypedEventEmitter<Events extends Record<string, (...args: any[]) => void>> extends EventEmitter {
    on<K extends Exclude<keyof Events, number>>(eventName: K, listener: Events[K]): this {
        return super.on(eventName, listener)
    }
    off<K extends Exclude<keyof Events, number>>(eventName: K, listener: Events[K]): this {
        return super.on(eventName, listener)
    }
    emit<K extends Exclude<keyof Events, number>>(eventName: K, ...args: Parameters<Events[K]>): boolean {
        return super.emit(eventName, ...args)
    }
}