import { ReactElement, useMemo } from "react";
import { PlayerState } from "../Game";

export default function ValueBars({playerState, accessKey = 'net_worth'}: {playerState: PlayerState[]; accessKey?: keyof PlayerState}): ReactElement {
    const values = useMemo(() => {
        const data = playerState.reduce((acc, player) => {
            acc.push(player[accessKey]);
            return acc;
        }, []);
        const max = Math.max(...data);
        return data.map((val) => ({absolute: val, percentage: Math.round(val * 100 / max)}));
    }, [playerState, accessKey]);
    return <>
        {values.map(({absolute, percentage}, key) => <div className={'bar bar-' + key} key={key}>
            <div className={'progress'} style={{height: percentage + '%'}}/>
            <div className={'absoluteValue'}>{absolute}</div>
        </div>)}

        <style jsx>{`
            .bar {
                position: absolute;
                height: 150px;
                width: 13px;
                bottom: 76px;   
            }

            .absoluteValue {
                color: #FFF;
                font-weight: bold;
                top: -36px;
                text-align: center;
                margin-left: -23px;
                width: 60px;
                position: absolute;

            }

            .bar-0 {
                left: 181px;
            }

            .bar-1 {
                left: 262px;
            }

            .bar-2 {
                left: 342px;
            }

            .bar-3 {
                left: 423px;
            }

            .bar-4 {
                left: 499px;
            }

            .bar-5 {
                right: 501px;
                width: 14px;
            }

            .bar-6 {
                right: 420px;
                width: 14px;
            }

            .bar-7 {
                right: 340px;
                width: 14px;
            }

            .bar-8 {
                right: 259px;
                width: 14px;
            }

            .bar-9 {
                right: 183px;
                width: 14px;
            }

            .progress {
                background-color: #FF9900;
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                max-height: 150px;
                box-shadow: 0 0 10px 0 #FF9900;
                transition: height 240ms ease-in-out;
                height: 0;
            }
            
        `}</style>
    </>;
}