import { Dispatch, SetStateAction, useState } from "react";
import { allStates, keyLike, Selectable } from "../backend/types";
import { ContextButton } from "./ContextButton";
import { Popup } from "./Popup";
import { SelectTile } from "./Tiles/SelectTile";
import { StyledTab } from "./StyledTab";
import { TileRender } from "./Tiles/TileRender";
import { TileButton } from "./Tiles/TileButton";


export function TileGrabber(props: {
    selectorState: Selectable,
    setSelectorState: Dispatch<SetStateAction<Selectable>>
}) {
    const [tilePopup, setTilePopup] = useState<boolean>(true)

    return (<div>
        <TileButton
            tile={props.selectorState}
            onClick={() => { setTilePopup(true) }}
        />
        <Popup active={tilePopup} setActive={setTilePopup}>
            <StyledTab>
                <SelectTile selectorState={props.selectorState} onClick={
                    (tile: Selectable) => {
                        props.setSelectorState(tile)
                        setTilePopup(false)
                        console.log(tile);
                    }
                } />
            </StyledTab>
        </Popup>
    </div>
    )
}