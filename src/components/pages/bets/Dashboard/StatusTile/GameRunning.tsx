import dayjs from "dayjs";
import { ReactElement, useEffect, useState } from "react";
import { BetRoundData } from "../../../../context/websocket/state";
import { secondsToTime } from "../../../live/Draft/TeamDraft/Timer";
import Label from "../Tile/Label";
import Value from "../Tile/Value";
import { useInterval } from "../TimingTile";

interface Props {
    betRound: BetRoundData;
}

export default function GameRunning({betRound}: Props): ReactElement {
    const [time, setTime] = useState(secondsToTime(dayjs().unix() - betRound.votingPossibleUntil));
    useInterval(() => {
        const unix = dayjs().unix();
        if(!betRound.winner) {
            setTime(secondsToTime(unix - betRound.votingPossibleUntil));
        } else {
            setTime(secondsToTime(betRound.winnerAnnouncement - unix));
        }
    });

    return <>
        <Value color={betRound.winner ? 'yellow' : undefined}>{time}</Value>
        <Label>{betRound.winner ? 'Warten auf Streamdelay' : 'Spiel läuft'}</Label>
    </>;
}