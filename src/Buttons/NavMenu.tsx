import { LayerManger } from "../2d/LayerManger";
import { Selectable } from "../backend/types";
import { NavInterface } from "../pathfinders/NavInterface";

export function NavMenu(props: {
    grid: LayerManger,
    nav: NavInterface<any>,
    selectorState: Selectable
}) {
    let Timer: NodeJS.Timer | undefined

    return (<div>
        <div id={"Block selector"} data-value={props.selectorState}
            style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "10px",
                border: "10px solid black",
            }}>
            <button style={{ alignSelf: "center", display: "flex" }}
                onMouseDown={() => { props.nav.StepPath() }}
            >Step path</button>
            <button style={{ alignSelf: "center", display: "flex" }}
                onMouseDown={() => {
                    if (!Timer) {
                        Timer = setInterval(() => {
                            if (props.nav.StepPath()) {
                                clearInterval(Timer)
                                Timer = undefined
                            }
                        }, 100)
                    } else {
                        clearInterval(Timer)
                        Timer = undefined
                    }
                }}
            >Toggle pathfinder</button>
            <button style={{ alignSelf: "center", display: "flex" }}
                onMouseDown={() => { props.nav.GeneratePath() }}
            >Generate path</button>
            <button style={{ width: 100, alignSelf: "center", display: "flex" }}
                onMouseDown={() => { props.nav.reset() }}
            >Remove Path</button>
        </div >
    </div>
    )
}