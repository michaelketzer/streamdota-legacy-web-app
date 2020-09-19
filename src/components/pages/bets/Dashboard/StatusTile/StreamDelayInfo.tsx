import dayjs from "dayjs";
import { ReactElement, useState } from "react";
import { BetRoundData } from "../../../../context/websocket/state";
import { secondsToTime } from "../../../live/Draft/TeamDraft/Timer";
import Label from "../Tile/Label";
import Value from "../Tile/Value";
import { useInterval } from "../TimingTile";

interface Props {
    betRound: BetRoundData;
}

export default function StreamDelayInfo({betRound}: Props): ReactElement {
    const currentTime = dayjs().unix();
    const [time, setTime] = useState(secondsToTime(betRound.votingStartingAt - currentTime)); 
    useInterval(() => setTime(secondsToTime(betRound.votingStartingAt - dayjs().unix())));
    return <>
        <Value color={'yellow'}>{time}</Value>
        <Label>Bis der Chat voten kann</Label>
    </>;
}