import React, { ReactElement, useMemo, useState } from "react";
import { useBetOverlay } from "../../../../modules/selector/BetOverlay";
import GoogleFontLoader from "react-google-font-loader";
import { currentBetRoundSelector } from "../../../../modules/selector/BetRound";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useInterval } from "../../bets/Dashboard/TimingTile";
import { BetRoundStats } from "@streamdota/shared-types";

interface Props {
    auth: string;
}

function calculateRemaining(currentBetRound: BetRoundStats): string {
    if(currentBetRound?.status === 'betting') {
        const finish = currentBetRound.created + 90;
        const diff = finish - dayjs().unix();
        if(diff > 0) {
            const min = Math.floor(diff / 60);
            let sec: number | string = diff % 60;
            sec = sec < 10  ? '0' + sec : sec;
            return `${min}:${sec}`;
        }
        return '0:00';
    }
    return '0:00';
}

export default React.memo(function OverlayTimer({auth}: Props): ReactElement | null {
    const overlay = useBetOverlay(auth);
    const currentBetRound = useSelector(currentBetRoundSelector);
    const [timer, setTimer] = useState(calculateRemaining(currentBetRound));
    useInterval(() => setTimer(calculateRemaining(currentBetRound)));

    if(Object.keys(overlay).length > 0 && currentBetRound.status === 'betting') {
        return <div className={'wrapper'}>
            {overlay.fontFamily && <GoogleFontLoader fonts={[{font: overlay.fontFamily, weights: [overlay.fontVariant]}]} />}
    
            <div className={'counter'}>{timer}</div>
    
            <style jsx>{`
                .wrapper {
                    background-color: ${overlay.timerBackground};
                    font-size: ${overlay.timerFontSize}px;
                    padding: .5em .75em;
                    line-height: 1em;
                    display: inline-block;
                }
    
                .counter {
                    font-family: ${overlay.fontFamily};
                    color: ${overlay.timerFont};
                }
            `}</style>
        </div>;
    }
    return null;
});