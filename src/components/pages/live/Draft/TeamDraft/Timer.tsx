import { ReactElement, useEffect, useState } from "react";
import { useInterval } from "../../../bets/Dashboard/TimingTile";

interface Props {
    active?: boolean;
    time: number;
    defaultTime?: number;
}

export function secondsToTime(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
    return `${min}:${sec}`;
}

export default function Timer({active = true, time, defaultTime = 0}: Props): ReactElement {
    const [left, setLeft] = useState(time);
    useEffect(() => setLeft(time), [time]);
    const [rem, setRem] = useState(secondsToTime(defaultTime));

    useEffect(() => {
        if(left > 0) {
            setRem(secondsToTime(left));
        } else {
            setRem('0:00')
        }
    }, [left]);

    return <>{rem}</>;
}