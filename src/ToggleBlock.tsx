import { useState } from "react"

export function ToggleBlock() {

    let [On, SetOn] = useState(false)

    return (
        <div>
            <button
                onClick={() => { SetOn(!On); console.log(On) }}
                style={{ backgroundColor: On ? "grey" : "red" }}
            >
                {On ? "grey" : "red"}
            </button>
        </div >
    )
}