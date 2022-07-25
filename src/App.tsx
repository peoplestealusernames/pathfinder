import { useMemo, useState } from 'react';
import './App.css';
import { Buttons } from './Buttons/Buttons';
import { ToggleGrid } from './ToggleGrid';
import { Popup } from './components/Popup';
import { BiCodeBlock } from 'react-icons/bi'
import { TbReplace } from 'react-icons/tb'
import { GrStatusPlaceholderSmall } from 'react-icons/gr'
import { SelectTile } from './Buttons/SelectTile';
import { Selectable } from './backend/types';
import { setup } from './setup';

function App() {
  const [InfoPopupState, setInfoPopupState] = useState<boolean>(false)
  const [ButtonsPopupState, setButtonsPopupState] = useState<boolean>(false)
  const [PlacePopupState, setPlacePopupState] = useState<boolean>(false)

  const [SelectorState, setSelectorState] = useState<Selectable>("empty")

  const [Grid, CanvasMang, Nav] = useMemo(() => { return setup() }, [])

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
