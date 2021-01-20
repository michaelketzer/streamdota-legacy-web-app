import { ReactElement, useMemo } from "react";
import { PlayerState } from "../Game";

interface Props {
    players: PlayerState[];
}
export default function DeathCounter({players}: Props): ReactElement {
    const deahts = useMemo(() => players && players.reduce((acc, player) => acc + player.deaths, 0) || 0, [players]);

    return <div className={'count'}>
        {deahts}

        <style jsx>{`
            .count {
                font-size: 2em;
                margin: 0 25px;
                color: #999;
                font-weight: bold;
                margin-top: -8px;
            }    
        `}</style>
    </div>
}