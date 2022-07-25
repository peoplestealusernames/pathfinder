import { useMemo, useState } from 'react';
import './App.css';
import { Buttons } from './Buttons/Buttons';
import { ToggleGrid } from './ToggleGrid';
import { Popup } from './components/Popup';
import { TbReplace } from 'react-icons/tb'
import { GrStatusPlaceholderSmall } from 'react-icons/gr'
import { SelectTile } from './Buttons/SelectTile';
import { Selectable } from './backend/types';
import { setup } from './setup';
import { TopBar } from './components/TopBar';
import { TopBarButton } from './components/TopBarButton';

function App() {
  const [InfoPopupState, setInfoPopupState] = useState<boolean>(false)
  const [ButtonsPopupState, setButtonsPopupState] = useState<boolean>(false)
  const [PlacePopupState, setPlacePopupState] = useState<boolean>(false)

  const [SelectorState, setSelectorState] = useState<Selectable>("empty")

  const [Grid, CanvasMang, Nav] = useMemo(() => { return setup() }, [])

  return (
    <div className="App" style={{
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      backgroundColor: "#4e4e4e",
    }}>
      <TopBar>
        <TopBarButton context='Old Menu' setTrueState={setButtonsPopupState}>
          <GrStatusPlaceholderSmall size={30} />
        </TopBarButton>
        <TopBarButton context='Place Menu' setTrueState={setPlacePopupState}>
          <TbReplace size={30} />
        </TopBarButton>
      </TopBar>

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
      <ToggleGrid grid={Grid} canvasMang={CanvasMang} selectorState={SelectorState}
        style={{ "border": "10px solid black" }}
      />
    </div >
  );
}

export default App;
