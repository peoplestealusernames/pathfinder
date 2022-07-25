import { CanvasManager } from "./2d/canvasManger"
import { LayerManger } from "./2d/LayerManger"
import { xy } from "./backend/types"
import { GridToNode2d } from "./nodes/gridToNode"
import { FloodFill } from "./pathfinders/floodfill"
import { NavInterface } from "./pathfinders/NavInterface"

const Movement: [number, number][] = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
]

export function setup(): [LayerManger, CanvasManager, NavInterface<xy>] {
    const Grid = new LayerManger(75, 25)
    const CanvasMang = new CanvasManager(Grid)
    let Nodes = GridToNode2d(Grid.BaseGrid, Movement)
    const Start = Nodes.get(...Grid.getStart())
    const Finish = Nodes.get(...Grid.getGoal())

    //TODO: remove patch work
    if (!(Start && Finish)) {
        throw new Error("no start or finish")
    }

    const Nav = new FloodFill(
        Start,
        Finish
    )

    Grid.on("sizeChange", () => {
        Nodes = GridToNode2d(Grid.BaseGrid, Movement)
        const Start = Nodes.get(...Grid.getStart())
        const Finish = Nodes.get(...Grid.getGoal())

        if (!Start || !Finish)
            return

        Nav.setStart(Start)
        Nav.setGoal(Finish)

        CanvasMang.reRender()
    })

    Grid.on("startMove", (x, y) => {
        const tile = Nodes.get(x, y)
        if (tile)
            Nav.setStart(tile)
    })

    Grid.on("goalMove", (x, y) => {
        const tile = Nodes.get(x, y)
        if (tile)
            Nav.setGoal(tile)
    })

    Grid.BaseGrid.on("clear", () => {
        Nav.reset()
    })
    Grid.on("clear", () => {
        Nav.reset()
    })

    Nav.on("update", (node, state) => { Grid.NavGrid.set(node.data.x, node.data.y, state) })
    Nav.on("reset", () => { Grid.NavGrid.clear() })
    Nav.on("solved", (solvedStack) => {
        while (true) {
            const node = solvedStack.pop()
            if (!node)
                return

            Grid.NavGrid.set(node.data.x, node.data.y, "solved")
        }
    })

    return [Grid, CanvasMang, Nav]
}