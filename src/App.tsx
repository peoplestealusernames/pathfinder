import React, { useEffect, useState } from 'react';
import './App.css';
import { CanvasGrid } from './canvas';
import { ToggleGrid } from './ToggleGrid';
import { Path, validState, Vec2, Walkable } from './types';

function App() {
  let [x, setX] = useState(75)
  let [y, setY] = useState(25)

  let running = false;
  let solution = false;

  let [Qued, SetQued] = useState<Path[]>(() => {
    let Qued1: Path[] = []
    const start = new Vec2(0, 0);
    Qued1[0] = new Path()
    Qued1[0].nodes[0] = start

    return Qued1
  })

  let [Grid, SetGrid] = useState<CanvasGrid>(new CanvasGrid(x, y))

  useEffect(() => { SetGrid(new CanvasGrid(x, y)) }, [x, y])

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
      <div className="Buttons" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", width: "100vw" }}>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          <input type="number" value={x} onChange={(e: any) => { setX(e.target.value) }} style={{ width: 50 }} />
          <input type="number" value={y} onChange={(e: any) => { setY(e.target.value) }} style={{ width: 50 }} />
          <button style={{ width: 75, alignSelf: "center", display: "flex" }}
            onClick={() => { Grid.reset(); const path = new Path(); path.add(new Vec2(0, 0)); SetQued([path]) }}
          >Reset</button>
        </div>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          <button style={{ width: 100, alignSelf: "center", display: "flex" }}
            onClick={() => { SetQued(StepPath(Grid, Qued)); }}
          >Step path</button>
          <button style={{ width: 100, alignSelf: "center", display: "flex" }}
            onClick={() => { RunPath() }}
          >Run path</button>
          <button style={{ width: 100, alignSelf: "center", display: "flex" }}
            onClick={() => { GeneratePath() }}
          >Generate path</button>
        </div>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          <button style={{ width: 100, alignSelf: "center", display: "flex" }}
            onClick={() => {
              let stri = ""
              for (const row of Grid.getGrid()) {
                for (const cell of row) {
                  stri += cell + ","
                }
                stri += "\n"
              }
              console.log(stri);
            }}
          >Log Data</button>

          <button style={{ width: 100, alignSelf: "center", display: "flex" }}
            onClick={() => {
              let stri = ""
              for (const Que of Qued) {
                stri += JSON.stringify(Que.last())
              }
              console.log(stri);
            }}
          >Log Que</button>
        </div>

        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          <button style={{ width: 100, alignSelf: "center", display: "flex" }}
            onClick={() => {
              for (let i = 0; i < 10; i++)
                SetRandomWall(Grid)
            }}
          >10x walls</button>
          <button style={{ width: 100, alignSelf: "center", display: "flex" }}
            onClick={() => {
              for (let i = 0; i < 100; i++)
                SetRandomWall(Grid)
            }}
          >100x walls</button>
        </div>
        <p style={{ padding: "10px", margin: "0px" }}>Path starts in top left and goes to bottem right</p>
      </div>
      <ToggleGrid grid={Grid} />
    </div >
  );

  function RunPath() {
    if (!running) {
      setInterval(() => {
        Qued = StepPath(Grid, Qued)
        SetQued(Qued);
      }, 100)
    }
  }
  function GeneratePath() {
    if (!running) {
      //TODO: Stop timer for running
    }
    while (Qued.length !== 0) {
      Qued = StepPath(Grid, Qued)
    }
    SetQued(Qued);
  }
}

function SetRandomWall(grid: CanvasGrid) {
  let tile: validState | null = null
  let x = 0
  let y = 0
  //TODO: prevent infi loop
  while (tile !== "empty") {
    x = getRandomInt(grid.width)
    y = getRandomInt(grid.height)
    tile = grid.get(x, y)
  }
  grid.set(x, y, "wall")
}

function StepPath(grid: CanvasGrid, Qued: Path[]) {
  let ret: Path[] = []

  console.log("Stepping pathfinder")
  for (const pos of Qued) {
    const surroundings = CheckSurround(grid, pos)
    if (Array.isArray(surroundings)) {
      ret.push(...surroundings)
    } else {
      PathFound(grid, surroundings)
      console.log("path found")
    }
  }

  console.log(`Step done ${ret.length} paths`)
  return ret
}

function PathFound(grid: CanvasGrid, path: Path) {
  for (const node of path.nodes) {
    grid.set(node.x, node.y, "solved")
  }
}

const Movement = [
  new Vec2([0, 1]),
  new Vec2([1, 0]),
  new Vec2([0, -1]),
  new Vec2([-1, 0])
]

function CheckSurround(grid: CanvasGrid, path: Path) {
  let ret: Path[] = []
  const origin = path.last()
  grid.set(origin.x, origin.y, "checked")

  for (const offset of Movement) {

    const pos = origin.add(offset)
    const tile = grid.get(pos.x, pos.y)
    if (tile)
      if (Walkable[tile]) {
        if (tile === "goal") {
          path.add(pos)
          return path
        }
        let Branch = path.Branch()
        Branch.add(pos)
        ret.push(Branch)
        grid.set(pos.x, pos.y, "qued")
      }
  }

  return ret
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default App;
