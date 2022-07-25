import React, { useMemo, useState } from 'react';
import './App.css';
import { Buttons } from './Buttons/Buttons';
import { LayerManger } from './2d/LayerManger';
import { ToggleGrid } from './ToggleGrid';
import { CanvasManager } from './2d/canvasManger';
import { FloodFill } from './pathfinders/floodfill';
import { GridToNode2d } from './nodes/gridToNode';
import { Popup } from './components/Popup';
import { BiCodeBlock } from 'react-icons/bi'
import { TbReplace } from 'react-icons/tb'
import { GrStatusPlaceholderSmall } from 'react-icons/gr'
import { SelectTile } from './Buttons/SelectTile';
import { Selectable } from './backend/types';

const Movement: [number, number][] = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
]

function App() {
  const [InfoPopupState, setInfoPopupState] = useState<boolean>(false)
  const [ButtonsPopupState, setButtonsPopupState] = useState<boolean>(false)
  const [PlacePopupState, setPlacePopupState] = useState<boolean>(false)

  const [SelectorState, setSelectorState] = useState<Selectable>("empty")

  const [Grid, CanvasMang, Nav] = useMemo(() => {
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
  }, [])

  return (
    <div className="App" style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
      <div className='TopBar' style={{
        display: "flex", position: "fixed", width: "100vw", height: "50px",
        alignItems: "center",
        justifyItems: "center",
        justifyContent: "center",
        background: "grey"
      }}>
        <div className='Logo' style={{
          display: "flex", position: "absolute", width: "100vw", height: "50px",
          alignItems: "center",
          justifyItems: "center",
          left: "10px",
          fontSize: "25px"
        }}>
          <BiCodeBlock size={30} />
          Pathfinder
        </div>
        <button style={{ position: "relative", margin: "2px" }}
          onMouseDown={() => setButtonsPopupState(true)
          }>
          <GrStatusPlaceholderSmall size={30} />
        </button>
        <button style={{ position: "relative", margin: "2px" }}
          onMouseDown={() => setPlacePopupState(true)
          }>
          <TbReplace size={30} />
        </button>
      </div>
      <Popup active={InfoPopupState} setActive={setInfoPopupState} >
        <div style={{ color: "red" }}>test</div>
      </Popup >
      <Popup active={ButtonsPopupState} setActive={setButtonsPopupState} >
        <div style={{ display: "flex", backgroundColor: "black", borderRadius: "20px", padding: "10px" }}>
          <Buttons grid={Grid} nav={Nav} canvas={CanvasMang} />
        </div>
      </Popup >
      <Popup active={PlacePopupState} setActive={setPlacePopupState} >
        <div style={{ display: "flex", backgroundColor: "black", borderRadius: "10px", padding: "10px" }}>
          <SelectTile setSelectorState={setSelectorState} selectorState={SelectorState} />
        </div>
      </Popup >
      <ToggleGrid grid={Grid} canvasMang={CanvasMang} selectorState={SelectorState} />
    </div >
  );


}

export default App;
