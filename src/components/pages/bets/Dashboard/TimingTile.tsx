import { ReactElement, useRef, useEffect, useMemo, useState } from "react";
import SimpleValueTile from "./SimpleValueTile";
import dayjs from "dayjs";
import i18nInstance from "../../../../i18n";
import { WithTranslation } from "next-i18next";

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

const TimingTile = ({t, status, created}: {status: 'betting' | 'running' | 'finished'; created: number} & WithTranslation): ReactElement => {
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
            return t('bet-dashboard-timing-waiting');
        } else if(status === 'betting' && remaining > 0) {
            const min = Math.floor(remaining / 60);
            const sec = Math.floor(remaining % 60);
            return (min < 10 ? `0${min}` : min) + ':' + (sec < 10 ? `0${sec}` : sec);
        } else if(status === 'betting' && remaining <= 0) {
            return '0:00';
        }

        return t('bet-dashboard-timing-expired');
    }, [status, remaining]);

    return <>
        <SimpleValueTile value={time} label={t('bet-dashboard-timing-label')} />
    </>;
}

export default i18nInstance.withTranslation('betSystem')(TimingTile)