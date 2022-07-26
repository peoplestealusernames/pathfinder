import { keyLike } from "../../backend/types";
import { FollowMouse } from "../../FollowMouse";
import { TileRender } from "./TileRender";


export function TileCursor(props: {
    tile: keyLike
}) {

    return (
        <FollowMouse>
            <span style={{
                width: "5px",
                height: "5px",
                borderRadius: "5px",
                backgroundColor: "wheat"
            }} />
            <TileRender style={{
                width: "15px",
                height: "15px",
                border: "3px solid white",
                borderRadius: "5px"
            }} tile={props.tile} />
        </FollowMouse>
    )
}