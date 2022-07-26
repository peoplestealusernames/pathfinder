import { LayerManger } from "../2d/LayerManger";
import { ChangeDim } from "../Buttons/ChangeDim";
import { StyledTab } from "./StyledTab";

export function SettingsMenu(props: {
    grid: LayerManger
}) {

    return (
        <StyledTab title="Settings" style={{
            flexDirection: "column",
            alignItems: "center",
            color: "white"
        }}>
            <span style={{ flexDirection: "column", alignItems: "center" }}>
                <ChangeDim key="ChangeX" inputType="number" initValue={props.grid.getWidth()} setter={(width: number) => { props.grid.setWidth(width) }} />
                <ChangeDim key="ChangeY" inputType="number" initValue={props.grid.getHeight()} setter={(height: number) => { props.grid.setHeight(height) }} />
            </span>
            MENU UNDER CONSTRUCTION
        </StyledTab>
    )
}