import { removeItem } from "../backend/misc"


export class ParrentChildClass<T extends ParrentChildClass<any>> {
    private children: T[] = []
    private parents: T[] = []

    isChild(node: T) {
        return this.children.includes(node)
    }

    isParent(node: T) {
        return this.parents.includes(node)
    }

    getChildren() {
        return Array.from(this.children)
    }

    getParents() {
        return Array.from(this.parents)
    }

    addChilds(...children: T[]) {
        children.forEach(child => {
            this.children.push(child)

            if (!child.isParent(this))
                child.addParents(this)
        });
    }

    addParents(...parents: T[]) {
        parents.forEach(parent => {
            this.parents.push(parent)

            if (!parent.isChild(this))
                parent.addChilds(this)
        });
    }

    removeChilds(...children: T[]) {
        children.forEach(child => {
            removeItem(this.children, child)

            if (child.isParent(this))
                child.removeParents(this)
        });
    }

    removeParents(...parents: T[]) {
        parents.forEach(parent => {
            removeItem(this.parents, parent)

            if (parent.isChild(this))
                parent.removeChilds(this)
        });
    }

    removeRefrences() {
        this.removeChilds(...this.children)
        this.removeParents(...this.parents)
    }
}