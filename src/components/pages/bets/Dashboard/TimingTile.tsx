import { ReactElement, useRef, useEffect, useMemo, useState } from "react";
import SimpleValueTile from "./SimpleValueTile";
import dayjs from "dayjs";

export function useInterval(callback) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function tick() {
            // @ts-ignore
            savedCallback.current();
        }

        let id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);
}

function getTimeRemaining(created: number): number {
    return created + 90 - dayjs().unix();
}

export default function TimingTile({status, created}: {status: 'betting' | 'running' | 'finished'; created: number}): ReactElement {
    const [remaining, setRemaining] = useState<null | number>(status === 'betting' ? getTimeRemaining(created) : null);

    useEffect(() => {
        if(status === 'betting') {
            setRemaining(getTimeRemaining(created));
        }
    }, [status, created]);

    useInterval(() => {
        if(status === 'betting' && remaining > 0) {
            setRemaining(remaining - 1);
        }
    });

    const time = useMemo(() => {
        if(status === 'finished') {
            return 'Warte auf Spiel';
        } else if(status === 'betting') {
            const min = Math.floor(remaining / 60);
            const sec = Math.floor(remaining % 60);
            return (min < 10 ? `0${min}` : min) + ':' + (sec < 10 ? `0${sec}` : sec);
        }

        return 'Abgelaufen';
    }, [status, remaining]);

    return <>
        <SimpleValueTile value={time} label={'Zeit'} />
    </>;
}