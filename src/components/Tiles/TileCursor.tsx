import { keyLike } from "../../backend/types";
import { FollowMouse } from "../../FollowMouse";
import { TileRender } from "./TileRender";


export function TileCursor(props: {
    tile: keyLike
}) {

    return (
        <FollowMouse>
            <span style={{
                position: "absolute",
                left: "-2",
                top: "-2",
                width: "4px",
                height: "4px",
                borderRadius: "5px",
                backgroundColor: "white",
            }} />
            <TileRender style={{
                position: "absolute",
                left: "3px",
                top: "3px",
                width: "15px",
                height: "15px",
                border: "2px solid white",
                borderRadius: "5px"
            }} tile={props.tile} />
        </FollowMouse>
    )
}