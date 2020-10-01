import { ReactElement } from "react";
import { PlayerState } from "../Game";
import DeathCounter from "./DeathCounter";
import Players from "./Players";

interface Props {
    state: PlayerState[];
}

export default function GamePlayerState({state}: Props): ReactElement {
    const radiantTeam = state.slice(0, 5);
    const direTeam = state.slice(5);

    return <div className={'heroContainer'}>
        <Players state={radiantTeam} />

        <DeathCounter players={direTeam} />

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;

        <DeathCounter players={radiantTeam} />

        <Players state={direTeam} dire />

        <style jsx>{`
            .heroContainer {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        `}</style>
    </div>;
}