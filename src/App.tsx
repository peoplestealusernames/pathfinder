import React, { useEffect, useState } from 'react';
import './App.css';
import { CanvasGrid } from './canvas';
import { NavGrid } from './navGrid';
import { ToggleGrid } from './ToggleGrid';
import { Path, validState, Vec2, Walkable } from './types';


function App() {
  let [x, setX] = useState(75)
  let [y, setY] = useState(25)

  let [Grid, SetGrid] = useState<CanvasGrid>(new CanvasGrid(x, y))
  let [Nav, SetNav] = useState<NavGrid>(new NavGrid(Grid))

  let [WallCount, SetWallCount] = useState(1)

  useEffect(() => { SetGrid(new CanvasGrid(x, y)) }, [x, y])

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
      <div className="Buttons" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", width: "100vw" }}>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          <input type="number" value={x} onChange={(e: any) => { setX(e.target.value) }} style={{ width: 50 }} />
          <input type="number" value={y} onChange={(e: any) => { setY(e.target.value) }} style={{ width: 50 }} />
          <button style={{ width: 50, alignSelf: "center", display: "flex" }}
            onClick={() => { Grid.reset(); Nav.Reset() }}
          >Reset</button>
          <button style={{ width: 100, alignSelf: "center", display: "flex" }}
            onClick={Nav.Reset}
          >Remove Path</button>
        </div>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          <button style={{ width: 100, alignSelf: "center", display: "flex" }}
            onClick={() => { Nav.StepPath() }}
          >Step path</button>
          <button style={{ width: 100, alignSelf: "center", display: "flex" }}
            onClick={() => { Nav.RunPath() }}
          >Run path</button>
          <button style={{ width: 100, alignSelf: "center", display: "flex" }}
            onClick={() => { Nav.GeneratePath() }}
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
              const Qued = Nav.GetQued()
              if (Qued) {
                for (const Que of Qued) {
                  stri += JSON.stringify(Que.last())
                }
              } else {
                stri += "Nothing qued"
              }
              console.log(stri);
            }}
          >Log Que</button>
        </div>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          <input type="number" value={WallCount} onChange={(e: any) => { SetWallCount(e.target.value) }}
            style={{ width: 50, WebkitAppearance: "none", MozAppearance: "textfield", padding: 0, }} />
          <button style={{ width: 100, alignSelf: "center", display: "flex" }}
            onClick={() => {
              for (let i = 0; i < WallCount; i++)
                SetRandomWall(Grid)
            }}
          >
            x walls
          </button>
        </div>
        <p style={{ padding: "10px", margin: "0px" }}>Path starts in top left and goes to bottem right</p>
      </div>
      <ToggleGrid grid={Grid} />
    </div >
  );


}

function SetRandomWall(grid: CanvasGrid) {
  let tile: validState | null = null
  let x = 0
  let y = 0
  for (let loop = 0; tile !== "empty" && loop < 10; loop++) {
    x = getRandomInt(grid.width)
    y = getRandomInt(grid.height)
    tile = grid.get(x, y)
  }
  grid.set(x, y, "wall")
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default App;
