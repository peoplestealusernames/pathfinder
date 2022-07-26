import { StyledTab } from "./StyledTab";

export function InfoMenu() {
    //TODO: make name
    return (
        <StyledTab
            title="Pathfinder Info"
            style={{
                flexDirection: "column"
            }}>
            <span style={{ color: "white" }}>
                MENU UNDER CONSTRUCTION
            </span>
            <a href="https://github.com/peoplestealusernames/pathfinder">
                Back to github!
            </a>
        </StyledTab>
    )
}