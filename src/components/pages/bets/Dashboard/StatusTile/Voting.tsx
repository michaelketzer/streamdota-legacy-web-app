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

export default function Voting({betRound}: Props): ReactElement {
    const [time, setTime] = useState(secondsToTime(betRound.votingTimeRemaining)); 
    useEffect(() => setTime(secondsToTime(betRound.votingPossibleUntil - dayjs().unix())), [betRound])
    useInterval(() => setTime(secondsToTime(betRound.votingPossibleUntil - dayjs().unix())));
    return <>
        <Value color={'green'}>{time}</Value>
        <Label>Chat stimmt ab</Label>
    </>;
}