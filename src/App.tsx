import React from 'react';
import './App.css';
import { Buttons } from './Buttons/Buttons';
import { LayerManger } from './2d/LayerManger';
import { NavGrid } from './2d/navGrid';
import { ToggleGrid } from './ToggleGrid';
import { CanvasManager } from './2d/canvasManger';


function App() {

  const Grid = new LayerManger(75, 25)
  const Nav = new NavGrid(Grid)
  const CanvasMang = new CanvasManager(Grid)

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
      <button style={{ alignSelf: "center", display: "flex" }}
        onClick={() => { CanvasMang.reRender() }}
      >Rerender</button>
      <Buttons grid={Grid} nav={Nav} />
      <p style={{ padding: "10px", margin: "0px", width: "100vw" }}>Pathfinding starts on the orange start square and goes to the green goal square.</p>
      <ToggleGrid grid={Grid} canvasMang={CanvasMang} />
    </div >
  );


}

export default App;
