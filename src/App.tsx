import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ToggleBlock } from './ToggleBlock'
import { ToggleGrid } from './ToggleGrid';
import { validState } from './validStates';

function App() {
  const x = 10
  const y = 10

  let [Grid, SetGrid] = useState<validState[][]>(() => {
    let grid: validState[][] = []

    for (let i = 0; i < x; i++) {
      grid[i] = []
      for (let k = 0; k < y; k++) {
        grid[i][k] = "empty"
      }
    }

    return grid
  })

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
      <button style={{ width: 100, alignSelf: "center", display: "flex" }}
        onClick={() => Generate(Grid)}
      >Step path WIP</button>
      <p>Path starts in top left and goes to bottem right</p>
      <ToggleGrid x={x} y={y} grid={[Grid, SetGrid]} />
    </div>
  );
}

function Generate(grid: validState[][]) {
  console.log(grid[0][0])
}

export default App;
