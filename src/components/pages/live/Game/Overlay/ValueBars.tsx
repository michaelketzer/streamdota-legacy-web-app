import { ReactElement, useMemo } from "react";
import { PlayerState } from "../Game";
import accounting from 'accounting';

const typeNameMap = {
    'net_worth': 'Net worth',
}

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
            <div className={'absoluteValue'}>{accounting.formatNumber(absolute, 0, ' ')}</div>
        </div>)}

        <div className={'nameValue'}>{typeNameMap[accessKey]}</div>

        <style jsx>{`
            .bar {
                position: absolute;
                height: 150px;
                width: 13px;
                top: 60px;
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

            .nameValue {
                height: 30px;
                width: 200px;
                background-color: rgba(0,0,0,.4);
                position: absolute; top: 60px;
                left: 50%;
                transform: translateX(-50%);
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