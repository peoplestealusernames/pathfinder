//TODO: updated path

import { removeItem } from "../backend/misc"

export class Node<Data extends any> {
    private children: Node<Data>[]
    private parents: Node<Data>[] = []
    weight: number
    data?: Data

    //child nodes are all nodes that it can move to
    //parent nodes are all nodes that refrence it as a valid child
    //parents are generated automaticlly 
    constructor(weight: number, data: Data, children: Node<Data>[] = []) {
        this.children = children
        this.weight = weight
        this.data = data
    }

    isChild(node: Node<Data>) {
        return this.children.includes(node)
    }

    isParent(node: Node<Data>) {
        return this.parents.includes(node)
    }

    getChildren() {
        return Array.from(this.children)
    }

    getParents() {
        return Array.from(this.parents)
    }

    addChilds(...children: Node<Data>[]) {
        children.forEach(child => {
            this.children.push(child)

            if (!child.isParent(this))
                child.addParents(this)
        });
    }

    addParents(...parents: Node<Data>[]) {
        parents.forEach(parent => {
            this.parents.push(parent)

            if (!parent.isChild(this))
                parent.addChilds(this)
        });
    }

    removeChilds(...children: Node<Data>[]) {
        children.forEach(child => {
            removeItem(this.children, child)

            if (child.isParent(this))
                child.removeParents(this)
        });
    }

    removeParents(...parents: Node<Data>[]) {
        parents.forEach(parent => {
            removeItem(this.parents, parent)

            if (parent.isChild(this))
                parent.removeChilds(this)
        });
    }
}