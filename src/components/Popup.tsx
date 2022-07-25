import { Dispatch, SetStateAction, useEffect } from "react";
import { BlurBackground } from "./BlurBackground";
import { CenterDiv } from "./CenterDiv";


export function Popup(props: { active: boolean, setActive: Dispatch<SetStateAction<boolean>>, children?: React.ReactNode }) {
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