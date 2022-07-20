

export class CallbackClass<FNC extends (...args: any) => any>{
    private FNCS!: FNC[]

    constructor(callBackType: FNC) {

    }

    addCallback(callback: FNC) {
        this.FNCS.push(callback)
    }

    removeCallback(callback: FNC) {
        this.FNCS.push(callback)
    }

    callback(...args: Parameters<FNC>) {
        for (const run of this.FNCS) {
            run(args)
        }
    }
}