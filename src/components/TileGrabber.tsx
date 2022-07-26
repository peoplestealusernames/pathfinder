import { Dispatch, SetStateAction, useState } from "react";
import { allStates, keyLike, Selectable, SelectableArray } from "../backend/types";
import { ContextButton } from "./ContextButton";
import { Popup } from "./Popup";
import { SelectTile } from "./Tiles/SelectTile";
import { StyledTab } from "./StyledTab";
import { TileRender } from "./Tiles/TileRender";
import { TileButton } from "./Tiles/TileButton";


export function TileGrabber(props: {
    selectorState: Selectable,
    setSelectorState: Dispatch<SetStateAction<Selectable>>
    allowedStates?: Selectable[]
}) {
    const [tilePopup, setTilePopup] = useState<boolean>(false)

    return (<div>
        <TileButton
            tile={props.selectorState}
            onClick={() => { setTilePopup(true) }}
        />
        <Popup
            active={tilePopup}
            setActive={setTilePopup}
            dissableCloseButton={true}
        >
            <StyledTab>
                <SelectTile
                    allowedStates={props.allowedStates}
                    selectorState={props.selectorState}
                    onClick={
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