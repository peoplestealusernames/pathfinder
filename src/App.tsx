import React, { useState } from 'react';
import './App.css';
import { ToggleGrid } from './ToggleGrid';
import { Path, Tile, Vec2, Walkable } from './types';

function App() {
  const x = 50
  const y = 50

  let running = false;
  let solution = false;

  let [Qued, SetQued] = useState<Path[]>(() => {
    let Qued1: Path[] = []
    const start = new Vec2(0, 0);
    Qued1[0] = new Path()
    Qued1[0].nodes[0] = start

    return Qued1
  })

  let [Grid, SetGrid] = useState<Tile[][]>(() => {
    let grid: Tile[][] = []

    for (let i = 0; i < x; i++) {
      grid[i] = []
      for (let k = 0; k < y; k++) {
        grid[i][k] = new Tile(i, k, "empty")
      }
    }

    grid[x - 1][y - 1].state = "goal"

    return grid
  })

  //TODO:PASS UPDATE FNC TO HTML
  function UpdateGridState() {
    SetGrid(Array.from(Grid))
  }

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        <button style={{ width: 100, alignSelf: "center", display: "flex" }}
          onClick={() => { SetQued(StepPath(Grid, Qued)); UpdateGridState() }}
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
            for (const row of Grid) {
              for (const cell of row) {
                stri += cell.state + ","
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
            for (let i = 0; i < 10; i++) {
              let tile = Grid[getRandomInt(x)][getRandomInt(y)]
              while (tile.state !== "empty") {
                tile = Grid[getRandomInt(x)][getRandomInt(y)]
              }
              tile.state = "wall"
            }
            UpdateGridState()
          }}
        >10x walls</button>
        <button style={{ width: 100, alignSelf: "center", display: "flex" }}
          onClick={() => {
            for (let i = 0; i < 100; i++) {
              let tile = Grid[getRandomInt(x)][getRandomInt(y)]
              while (tile.state !== "empty") {
                tile = Grid[getRandomInt(x)][getRandomInt(y)]
              }
              tile.state = "wall"
            }
            UpdateGridState()
          }}
        >100x walls</button>
      </div>

      <p>Path starts in top left and goes to bottem right</p>
      <ToggleGrid grid={Grid} update={UpdateGridState} />
    </div >
  );

  function RunPath() {
    if (!running) {
      setInterval(() => {
        Qued = StepPath(Grid, Qued)
        SetQued(Qued); UpdateGridState()
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
    SetQued(Qued); UpdateGridState()
  }
}

function StepPath(grid: Tile[][], Qued: Path[]) {
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

function PathFound(grid: Tile[][], path: Path) {
  for (const node of path.nodes) {
    grid[node.x][node.y].state = "solved"
  }
}

const Movement = [
  new Vec2([0, 1]),
  new Vec2([1, 0]),
  new Vec2([0, -1]),
  new Vec2([-1, 0])
]

function CheckSurround(grid: Tile[][], path: Path) {
  let ret: Path[] = []
  const origin = path.last()
  grid[origin.x][origin.y].state = "checked"

  for (const offset of Movement) {

    const pos = origin.add(offset)
    const tile = GetTile(grid, pos)
    if (tile)
      if (Walkable[tile?.state]) {
        if (tile.state === "goal") {
          path.add(pos)
          return path
        }
        let Branch = path.Branch()
        Branch.add(pos)
        ret.push(Branch)
        tile.state = "qued"
      }
  }

  return ret
}

function GetTile(grid: Tile[][], pos: Vec2) {
  if (grid[pos.x])
    if (grid[pos.y])
      return grid[pos.x][pos.y]

  return null
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default App;
