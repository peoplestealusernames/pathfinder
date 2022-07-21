//TODO: updated path

export class Node<Data extends any> {
    private neighbors: Node<Data>[]
    weight: number
    data?: Data

    constructor(weight: number, data: Data, neighbors: Node<Data>[] = []) {
        this.neighbors = neighbors
        this.weight = weight
        this.data = data
    }

    getNeighbors() {
        return Array.from(this.neighbors)
    }

    addNeighbors(...neighbors: Node<Data>[]) {
        this.neighbors.push(...neighbors)
    }

    removeNeighbors(...neighbors: Node<Data>[]) {
        this.neighbors.push(...neighbors)
    }
}