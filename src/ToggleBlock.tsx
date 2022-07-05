import { useState } from "react"

export function ToggleBlock() {

    let [On, SetOn] = useState(false)

    return (
        <button
            onClick={() => { SetOn(!On); console.log(On) }}
            style={{
                backgroundColor: On ? "red" : "grey",
                margin: 0,
                border: 'solid',
                borderWidth: '1px',
                width: 20, height: 20
            }}
        />
    )
}