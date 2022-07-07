import React, { useEffect, useState } from 'react';
import './App.css';
import { ToggleGrid } from './ToggleGrid';
import { Path, Tile, Vec2, Walkable } from './types';

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

  function fillGrid(x: number, y: number) {
    let grid: Tile[][] = []

    for (let i = 0; i < y; i++) {
      grid[i] = []
      for (let k = 0; k < x; k++) {
        grid[i][k] = new Tile(k, i, "empty")
      }
    }

    grid[y - 1][x - 1].state = "goal"
    grid[0][0].state = "start"

    return grid
  }

  let [Grid, SetGrid] = useState<Tile[][]>(fillGrid(x, y))

  //TODO:PASS UPDATE FNC TO HTML
  function UpdateGridState() {
    SetGrid(Array.from(Grid))
  }

  function ResetGrid() {
    SetGrid(fillGrid(x, y))
  }

  useEffect(() => { ResetGrid() }, [x, y])

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
      <div className="Buttons" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", width: "100vw" }}>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          <input type="number" value={x} onChange={(e: any) => { setX(e.target.value) }} style={{ width: 50 }} />
          <input type="number" value={y} onChange={(e: any) => { setY(e.target.value) }} style={{ width: 50 }} />
          <button style={{ width: 75, alignSelf: "center", display: "flex" }}
            onClick={() => { ResetGrid() }}
          >Reset</button>
        </div>
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
              for (let i = 0; i < 10; i++)
                SetRandomWall(Grid)
              UpdateGridState()
            }}
          >10x walls</button>
          <button style={{ width: 100, alignSelf: "center", display: "flex" }}
            onClick={() => {
              for (let i = 0; i < 100; i++)
                SetRandomWall(Grid)
              UpdateGridState()
            }}
          >100x walls</button>
        </div>
        <p style={{ padding: "10px", margin: "0px" }}>Path starts in top left and goes to bottem right</p>
      </div>
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

function SetRandomWall(grid: Tile[][]) {
  //TODO: prevent infi loop
  let tile = RandomTile(grid)
  while (tile.state != "empty") {
    tile = RandomTile(grid)
  }
  tile.state = "wall"
}

function RandomTile(grid: Tile[][]) {
  return grid[getRandomInt(grid.length)][getRandomInt(grid[0].length)]
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
