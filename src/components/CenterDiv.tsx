import React from "react";


export function CenterDiv(props: { children?: React.ReactNode }) {

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            height: "100vh",
            width: "100vw",
            justifyContent: "center"
        }}>
            {props.children}
        </div>
    )
}