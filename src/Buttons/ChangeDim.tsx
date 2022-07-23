import { HTMLInputTypeAttribute, useState } from "react";

export function ChangeDim<T>(props: { setter: (arg0: T) => void, initValue: T, inputType: HTMLInputTypeAttribute }) {
    let [value, setValue] = useState<T>(props.initValue)

    return (
        <input type={props.inputType}
            value={
                (typeof value == "number") || (typeof value == "string") ?
                    value : JSON.stringify(value)
            }
            onChange={(e: any) => {
                const newValue = e.target.value
                setValue(newValue)
                props.setter(JSON.parse(newValue))
            }} style={{ width: 50 }} />
    )
}