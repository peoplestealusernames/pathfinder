import { Dispatch, SetStateAction, useEffect } from "react";
import { BlurBackground } from "./BlurBackground";
import { CenterDiv } from "./CenterDiv";


export function Popup(props: { active: boolean, setActive: Dispatch<SetStateAction<boolean>>, children?: React.ReactNode }) {
    const KeyPressed = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            props.setActive(false)
        }
    }

    useEffect(() => {
        if (props.active)
            window.addEventListener('keydown', KeyPressed)
        else
            window.removeEventListener('keydown', KeyPressed)

        return () => {
            window.removeEventListener('keydown', KeyPressed)
        }
    }, [props.active])

    return (<div className="Popup">
        {
            props.active &&
            <BlurBackground>
                <CenterDiv>
                    {props.children}
                </CenterDiv>
            </BlurBackground>
        }
    </div >)
}