import { ToggleBlock } from "./ToggleBlock"

export function ToggleGrid(props: { x: number, y: number }) {
    //TODO: make styles (including height from here pass to toggle block)
    return (
        <div style={{ margin: "0px", padding: "0px", height: 20 }}>
            {
                [...Array(props.x)].map((v, i) => {
                    return (<div style={{ margin: "0px", padding: "0px", height: 20 }}>
                        {
                            [...Array(props.y)].map((v, i) => {
                                return (<ToggleBlock />)
                            })
                        }
                    </div>
                    )
                })
            }
        </div>
    )
}