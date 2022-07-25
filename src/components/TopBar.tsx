import { BiCodeBlock } from "react-icons/bi"


export function TopBar(props: {
    children?: React.ReactNode
}) {

    return (<div className='TopBar' style={{
        display: "flex", position: "fixed", width: "100vw", height: "50px",
        alignItems: "center",
        justifyItems: "center",
        justifyContent: "center",
        background: "grey"
    }}>
        <div className='Logo' style={{
            display: "flex", position: "absolute", width: "100vw", height: "50px",
            alignItems: "center",
            justifyItems: "center",
            left: "10px",
            fontSize: "25px"
        }}>
            <BiCodeBlock size={30} />
            Pathfinder
        </div>
        {props.children}
    </div>)
}