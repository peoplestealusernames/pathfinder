import React, { useState } from 'react';
import './App.css';
import { Buttons } from './Buttons/Buttons';
import { LayerManger } from './2d/LayerManger';
import { ToggleGrid } from './ToggleGrid';
import { CanvasManager } from './2d/canvasManger';
import { FloodFill } from './pathfinders/floodfill';
import { GridToNode2d } from './nodes/gridToNode';

const Movement: [number, number][] = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]

function App() {
  const Grid = new LayerManger(75, 25)
  const CanvasMang = new CanvasManager(Grid)
  const Nodes = GridToNode2d(Grid.BaseGrid, Movement)
  const Start = Nodes.get(...Grid.getStart())
  const Finish = Nodes.get(...Grid.getGoal())

  //TODO: remove patch work
  if (!(Start && Finish)) {
    return (
      <div className="App">
        Error start and finish not valid
      </div>
    )
  }

  const Nav = new FloodFill(
    Start,
    Finish
  )

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

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
      <button style={{ alignSelf: "center", display: "flex" }}
        onClick={() => { CanvasMang.reRender() }}
      >Rerender</button>
      <Buttons grid={Grid} nav={Nav} canvas={CanvasMang} />
      <p style={{ padding: "10px", margin: "0px", width: "100vw" }}>Pathfinding starts on the orange start square and goes to the green goal square.</p>
      <ToggleGrid grid={Grid} canvasMang={CanvasMang} />
    </div >
  );


}

export default App;
