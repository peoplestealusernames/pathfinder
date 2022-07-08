import React, { useEffect, useState } from 'react';
import './App.css';
import { Buttons } from './Buttons/Buttons';
import { CanvasGrid } from './canvas';
import { NavGrid } from './navGrid';
import { ToggleGrid } from './ToggleGrid';
import { Path, validState, Vec2, Walkable } from './types';


function App() {

  const Grid = new CanvasGrid(5, 5)
  const Nav = new NavGrid(Grid)

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
      <Buttons grid={Grid} nav={Nav} />
      <p style={{ padding: "10px", margin: "0px" }}>Path starts in top left and goes to bottem right</p>
      <ToggleGrid grid={Grid} />
    </div >
  );


}

export default App;
