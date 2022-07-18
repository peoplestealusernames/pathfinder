import React from 'react';
import './App.css';
import { Buttons } from './Buttons/Buttons';
import { CanvasGrid } from './canvas';
import { NavGrid } from './2d/navGrid';
import { ToggleGrid } from './ToggleGrid';


function App() {

  const Grid = new CanvasGrid(75, 25)
  const Nav = new NavGrid(Grid)

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
      <Buttons grid={Grid} nav={Nav} />
      <p style={{ padding: "10px", margin: "0px", width: "100vw" }}>Pathfinding starts on the orange start square and goes to the green goal square.</p>
      <ToggleGrid grid={Grid} />
    </div >
  );


}

export default App;
