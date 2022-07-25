import React from "react";


export function CenterDiv(props: { children?: React.ReactNode }) {

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100vw"
        }}>
            {props.children}
        </div>
    )
}