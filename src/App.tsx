import { useMemo, useState } from 'react';
import './App.css';
import { Buttons } from './Buttons/Buttons';
import { ToggleGrid } from './ToggleGrid';
import { Popup } from './components/Popup';
import { SelectTile } from './Buttons/SelectTile';
import { Selectable } from './backend/types';
import { setup } from './setup';
import { TopBar } from './components/TopBar';
import { TopBarButton } from './components/TopBarButton';
import { InfoMenu } from './components/InfoMenu';

import { TbReplace } from 'react-icons/tb'
import { GrStatusPlaceholderSmall } from 'react-icons/gr'
import { AiFillSetting, AiOutlineInfoCircle } from "react-icons/ai"
import { SettingsMenu } from './components/SettingsMenu';

function App() {
  const [ButtonsPopupState, setButtonsPopupState] = useState<boolean>(false)
  const [PlacePopupState, setPlacePopupState] = useState<boolean>(false)

  const [InfoPopupState, setInfoPopupState] = useState<boolean>(true)
  const [SettingPopupState, setSettingPopupState] = useState<boolean>(false)

  const [SelectorState, setSelectorState] = useState<Selectable>("empty")

  const [Grid, CanvasMang, Nav] = useMemo(() => { return setup() }, [])

  return (
    <div className="App" style={{
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      backgroundColor: "#4e4e4e",
      minWidth: "100vw",
      minHeight: "100vh"
    }}>
      <TopBar>
        <div className='Logo' style={{
          display: "flex", position: "absolute", width: "100vw", height: "50px",
          alignItems: "center",
          justifyItems: "center",
          justifyContent: "right",
          right: "10px",
          fontSize: "25px",
          color: "white",
        }} >
          <TopBarButton setTrueState={setInfoPopupState}>
            <AiOutlineInfoCircle size={30} />
          </TopBarButton>
          <TopBarButton setTrueState={setSettingPopupState}>
            <AiFillSetting size={30} />
          </TopBarButton>
        </div>

        <TopBarButton context='Old Menu' setTrueState={setButtonsPopupState}>
          <GrStatusPlaceholderSmall size={30} />
        </TopBarButton>
        <TopBarButton context='Place Menu' setTrueState={setPlacePopupState}>
          <TbReplace size={30} />
        </TopBarButton>
      </TopBar>

      <Popup active={InfoPopupState} setActive={setInfoPopupState} >
        <InfoMenu />
      </Popup >
      <Popup active={SettingPopupState} setActive={setSettingPopupState} >
        <SettingsMenu />
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
