import React from "react";


export function StyledTab(props: {
    children?: React.ReactNode
    title?: string
    style?: React.CSSProperties
    titleStyle?: React.CSSProperties
    masterStyle?: React.CSSProperties
}) {

    return (
        <div style={{
            ...{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                justifyContent: "center",
                backgroundColor: "black",
                borderRadius: "0px",
                padding: "3px",
                border: "2px solid white",
            }, ...props.masterStyle
        }}>
            {props.title && <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}>
                <p style={{
                    ...{
                        width: "fit-content",
                        color: "white",
                        borderBottom: "4px solid white",
                        fontSize: "30px",
                        padding: "0px",
                        margin: "14px",
                        fontWeight: "bold",
                        userSelect: "none",
                    }, ...props.titleStyle
                }}>
                    {props.title}
                </p>
            </div>}
            <div
                style={{
                    ...{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                    }, ...props.style
                }}>
                {props.children}
            </div >
        </div >
    )
}