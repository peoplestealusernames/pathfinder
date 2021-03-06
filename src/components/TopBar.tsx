import { BiCodeBlock } from "react-icons/bi"

export function TopBar(props: {
    children?: React.ReactNode
}) {

    return (<div className='TopBar' style={{
        display: "flex", position: "fixed", width: "100vw", height: "50px",
        alignItems: "center",
        justifyItems: "center",
        justifyContent: "center",
        background: "black",
        borderBottom: '2px solid rgba(255, 255, 255, 1)',
        userSelect: "none"
    }}>
        <div className='Logo' style={{
            display: "flex", position: "absolute",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "left",
            left: "10px",
            fontSize: "25px",
            color: "white",
        }} >
            <BiCodeBlock
                size={30}
            />
            Pathfinder
        </div>
        {props.children}
    </div>)
}