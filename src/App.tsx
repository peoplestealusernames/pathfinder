import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import './App.css';
import { ToggleGrid } from './ToggleGrid';
import { Popup } from './components/Popup';
import { SelectTile } from './Buttons/SelectTile';
import { Selectable } from './backend/types';
import { setup } from './setup';
import { TopBar } from './components/TopBar';
import { TopBarButton } from './components/TopBarButton';
import { InfoMenu } from './components/InfoMenu';
import { SettingsMenu } from './components/SettingsMenu';
import { NavMenu } from './Buttons/NavMenu';

import { TbReplace } from 'react-icons/tb'
import { GiMaze, GiPathDistance } from 'react-icons/gi'
import { AiFillSetting, AiOutlineInfoCircle } from "react-icons/ai"
import { MazeMenu } from './Buttons/MazeMenu';

const PopupMenus: {
  Menu: (...args: any) => JSX.Element, Icon: (...args: any) => JSX.Element
}[] = [
    { Menu: SelectTile, Icon: TbReplace },
    { Menu: NavMenu, Icon: GiPathDistance },
    { Menu: MazeMenu, Icon: GiMaze }
  ]

function App() {

  const [PopupMenusStates, SetPopupMenusStates] =
    useState<boolean[]>(
      PopupMenus.map(() => { return false })
    )

  const StateArray: [boolean, Dispatch<SetStateAction<boolean>>][] = PopupMenus.map(
    (Menu, i): [boolean, Dispatch<SetStateAction<boolean>>] => {
      return [
        PopupMenusStates[i], ((state: boolean) => {
          const NewStates = Array.from(PopupMenusStates)
          NewStates[i] = state
          SetPopupMenusStates(NewStates)
        }) as Dispatch<SetStateAction<boolean>>
      ]
    }
  )

  //FIXME: allway enable in production
  const [InfoPopupState, setInfoPopupState] = useState<boolean>(false)
  const [SettingPopupState, setSettingPopupState] = useState<boolean>(false)

  const [SelectorState, setSelectorState] = useState<Selectable>("empty")

  const [Grid, CanvasMang, Nav] = useMemo(() => { return setup() }, [])

  const PassProps = {
    grid: Grid,
    nav: Nav,
    selectorState: SelectorState,
    setSelectorState: setSelectorState,
  }

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
        <div className='LeftSide' style={{
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

        {PopupMenus.map((Menu, i) => {
          return (
            <TopBarButton key={`MenuButton:${i}`} setTrueState={StateArray[i][1]}>
              {Menu.Icon({ size: 30 })}
            </TopBarButton>
          )
        })}
      </TopBar>

      <Popup active={InfoPopupState} setActive={setInfoPopupState} >
        <InfoMenu />
      </Popup >
      <Popup active={SettingPopupState} setActive={setSettingPopupState} >
        <SettingsMenu grid={Grid} />
      </Popup >

      {PopupMenus.map((Menu, i) => {
        return (
          <Popup key={`MenuPopup:${i}`} active={StateArray[i][0]} setActive={StateArray[i][1]} >
            {Menu.Menu(PassProps)}
          </Popup>
        )
      })}

      <ToggleGrid grid={Grid} canvasMang={CanvasMang} selectorState={SelectorState}
        style={{ "border": "10px solid black" }}
      />
    </div >
  );
}

export default App;
