import { LayerManger } from "../2d/LayerManger";
import { ChangeDim } from "../Buttons/ChangeDim";
import { StyledTab } from "./StyledTab";

export function SettingsMenu(props: {
    grid: LayerManger
}) {

    return (
        <StyledTab title="Settings">
            <ChangeDim key="ChangeX" inputType="number" initValue={props.grid.getWidth()} setter={(width: number) => { props.grid.setWidth(width) }} />
            <ChangeDim key="ChangeY" inputType="number" initValue={props.grid.getHeight()} setter={(height: number) => { props.grid.setHeight(height) }} />
            <button style={{ alignSelf: "center", display: "flex" }}
                onMouseDown={() => { props.grid.clear(); }}
            >Reset</button>
        </StyledTab>
    )
}