import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import './App.css';
import { ToggleGrid } from './ToggleGrid';
import { Popup } from './components/Popup';
import { SelectTileTab } from './Buttons/SelectTileTab';
import { Selectable } from './backend/types';
import { setup } from './setup';
import { TopBar } from './components/TopBar';
import { ContextButton } from './components/ContextButton';
import { InfoMenu } from './components/InfoMenu';
import { SettingsMenu } from './components/SettingsMenu';
import { NavMenu } from './Buttons/NavMenu';
import { MazeMenu } from './Buttons/MazeMenu';
import { NavBar } from './components/NavBar';

import { TbReplace } from 'react-icons/tb'
import { BsCone } from 'react-icons/bs'
import { VscSourceControl } from 'react-icons/vsc'
import { AiFillSetting, AiOutlineInfoCircle } from "react-icons/ai"

const PopupMenus: {
  Menu: (...args: any) => JSX.Element,
  Icon: (...args: any) => JSX.Element,
  Context?: string
}[] = [
    {
      Menu: SelectTileTab,
      Icon: TbReplace,
      Context: "Tile selector"
    },
    {
      Menu: NavMenu,
      Icon: VscSourceControl,
      Context: "Pathfinding"
    },
    {
      Menu: MazeMenu,
      Icon: BsCone,
      Context: "Obstacles"
    }
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

  const [InfoPopupState, setInfoPopupState] = useState<boolean>(
    process.env.NODE_ENV === "production"
  )
  const [SettingPopupState, setSettingPopupState] = useState<boolean>(false)

  const [SelectorState, setSelectorState] = useState<Selectable>("empty")

  const [Grid, CanvasMang, Nav] = useMemo(() => { return setup() }, [])

  const PassProps = {
    grid: Grid,
    nav: Nav,
    selectorState: SelectorState,
    setSelectorState: setSelectorState
  }

  return (
    <div className="App" style={{
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      backgroundColor: "#4e4e4e",
      minWidth: "100vw",
      minHeight: "100vh",
      width: "fit-content",
      height: "fit-content",
    }}>
      <TopBar>
        <div className='RightSide' style={{
          display: "flex", position: "absolute", width: "100vw", height: "50px",
          alignItems: "center",
          justifyItems: "center",
          justifyContent: "right",
          right: "10px",
          fontSize: "25px",
          color: "white",
        }} >
          <ContextButton setButtonState={setInfoPopupState}>
            <AiOutlineInfoCircle size={30} />
          </ContextButton>
          <ContextButton setButtonState={setSettingPopupState}>
            <AiFillSetting size={30} />
          </ContextButton>
        </div>
        <div style={{
          position: "absolute",
          top: "53px"
        }}>
          <NavBar
            grid={Grid}
            nav={Nav}
            showContext={false} />
        </div>

        {PopupMenus.map((Menu, i) => {
          const Icon = Menu.Icon
          return (
            <ContextButton
              key={`MenuButton:${i}`}
              setButtonState={StateArray[i][1]}
              context={Menu.Context}
              contextStyle={{
                top: "43px",
                fontSize: "13px",
                border: "2px solid white",
              }}
            >
              <Icon size={30} />
            </ContextButton>
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
        const MenuHTML = Menu.Menu
        return (
          <Popup key={`MenuPopup:${i}`} active={StateArray[i][0]} setActive={StateArray[i][1]} >
            <MenuHTML {...PassProps} />
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
