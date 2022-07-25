export function BlurBackground(props: {
    children?: React.ReactNode
}) {
    return (
        <div style={{
            position: "absolute",
            display: "flex",
            background: "rgba(0, 0, 30, 0.5)",
        }}>
            {props.children}
        </div>
    )
}