import { removeItem } from "../backend/misc"
import { ParrentChildClass } from "./PCClass"

export class Node<Data extends any> extends ParrentChildClass<Node<Data>> {
    weight: number
    data?: Data

    //child nodes are all nodes that it can move to
    //parent nodes are all nodes that refrence it as a valid child
    //parents are generated automaticlly 
    constructor(weight: number, data: Data, children: Node<Data>[] = []) {
        super()
        this.addChilds(...children)
        this.weight = weight
        this.data = data
    }
}