import { ToggleBlock } from "./ToggleBlock"
import { Tile } from "./types"

export function ToggleGrid(props: { grid: Tile[][], update: any }) {
    //TODO: make styles (including height from here pass to toggle block)

    return (
        <div key={`Grid:${props.grid.length}x${props.grid[0].length}`} style={{
            margin: "0px", padding: "0px",
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "column",
        }}>
            {
                props.grid.map((row, i) => {
                    let y = i
                    return (<div key={`ButtonRow:${y}`} style={{
                        margin: "0px", padding: "0px", height: 20,
                        display: "flex", flexWrap: "nowrap", flexDirection: "row",
                        justifyContent: "center"
                    }}>
                        {
                            row.map((tile, x) => {
                                return (<ToggleBlock key={`TButton:${x},${y}`} tile={tile} update={props.update} />)
                            })
                        }
                    </div>
                    )
                })
            }
        </div >
    )
}