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
                height: "100%",
                width: "100%"
            },
            ...props.styleOverride
        }}>
            {props.children}
        </div >
    )
}