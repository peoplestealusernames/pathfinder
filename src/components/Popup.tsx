import { Dispatch, SetStateAction, useEffect } from "react";
import { BlurBackground } from "./BlurBackground";
import { CenterDiv } from "./CenterDiv";
import { CloseButton } from "./CloseButton";


export function Popup(props: {
    active: boolean,
    setActive: Dispatch<SetStateAction<boolean>>,
    dissableCloseButton?: boolean;
    children?: React.ReactNode
}) {


    useEffect(() => {
        const KeyPressed = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                props.setActive(false)
            }
        }

        if (props.active)
            window.addEventListener('keydown', KeyPressed)
        else
            window.removeEventListener('keydown', KeyPressed)

        return () => {
            window.removeEventListener('keydown', KeyPressed)
        }
    }, [props])

    return (<div>
        {
            props.active &&
            <div style={{
                position: "fixed",
                top: "0px",
                left: "0px",
            }}>
                <BlurBackground>
                    <CenterDiv styleOverride={{ width: "100vw", height: "100vh" }}>
                        <span style={{
                            display: "flex",
                            position: "relative",
                            width: "fit-content",
                            height: "fit-content"
                        }}>
                            {
                                !props.dissableCloseButton &&
                                <CloseButton onClose={() => { props.setActive(false) }} />
                            }
                            {props.children}
                        </span>
                    </CenterDiv>
                </BlurBackground>
            </div >
        }
    </div >)
}