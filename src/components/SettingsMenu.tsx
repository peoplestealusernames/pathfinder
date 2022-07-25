import { LayerManger } from "../2d/LayerManger";
import { ChangeDim } from "../Buttons/ChangeDim";

export function SettingsMenu(props: {
    grid: LayerManger
}) {

    return (
        <div style={{
            display: "flex",
            backgroundColor: "white",
            padding: "10px",
            color: "black",
            borderRadius: "20px",
            border: "5px solid black",
            flexDirection: "column"
        }}>
            <p>
                Settings
            </p>
            <ChangeDim key="ChangeX" inputType="number" initValue={props.grid.getWidth()} setter={(width: number) => { props.grid.setWidth(width) }} />
            <ChangeDim key="ChangeY" inputType="number" initValue={props.grid.getHeight()} setter={(height: number) => { props.grid.setHeight(height) }} />
            <button style={{ alignSelf: "center", display: "flex" }}
                onMouseDown={() => { props.grid.clear(); }}
            >Reset</button>

        </div>
    )
}