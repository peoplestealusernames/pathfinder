import React from "react";


export function CenterDiv(props: {
    children?: React.ReactNode
    styleOverride?: React.CSSProperties
}) {

    return (
        <div style={{
            ...{
                display: "flex",
                alignItems: "center",
                justifyItems: "center",
                justifyContent: "center",
                flex: 1
            },
            ...props.styleOverride
        }}>
            {props.children}
        </div >
    )
}