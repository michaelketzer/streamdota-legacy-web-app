import { ReactElement, useMemo } from "react";
import { PlayerState } from "../Game";
import accounting from 'accounting';

export const typeNameMap = {
    'gpm': 'GPM',
    'xpm': 'XPM',
    'hero_damage': 'Hero Damage',
    'runes_activated': 'Rune Pickups',
    'camps_stacked': 'Camps Stacked',
    'support_gold_spent': 'Support Gold Spent'
}
export const iconNameMap = {
    'gpm': 'GPM.svg',
    'xpm': 'XPM.svg',
    'hero_damage': 'hero_dmg.svg',
    'runes_activated': 'runes.svg',
    'camps_stacked': 'camps.svg',
    'support_gold_spent': 'support_gold.svg'
}

const fakeData = [
    {absolute: 9201, percentage: 30},
    {absolute: 9201, percentage: 30},
    {absolute: 9201, percentage: 30},
    {absolute: 9201, percentage: 30},
    {absolute: 9201, percentage: 30},
    {absolute: 9201, percentage: 30},
    {absolute: 9201, percentage: 30},
    {absolute: 9201, percentage: 30},
    {absolute: 9201, percentage: 30},
    {absolute: 9201, percentage: 30},
]

export function useBarValues(accessKey: keyof PlayerState, playerState: PlayerState[]): Array<{absolute: number; percentage: number}> {
    return useMemo(() => {
        if(!playerState.length) {
            return fakeData;
        }
        const data = playerState.reduce((acc, player) => {
            acc.push(player[accessKey]);
            return acc;
        }, []);
        const max = Math.max(...data);
        return data.map((val) => ({absolute: val, percentage: Math.round(val * 100 / max)}));
    }, [playerState, accessKey]);
}

export default function ValueBars({playerState, accessKey = 'net_worth'}: {playerState: PlayerState[]; accessKey?: keyof PlayerState}): ReactElement {
    const values = useBarValues(accessKey, playerState);
    
    return <>
        {values.map(({absolute, percentage}, key) => <div className={'bar bar-' + key} key={key}>
            <div className={'progress'} style={{height: percentage + '%'}}/>
            <div className={'absoluteValue'}>{accounting.formatNumber(absolute, 0, ' ')}</div>
        </div>)}

        <div className={'typeContainer'}><img src={'/images/icons/' + iconNameMap[accessKey]} alt={accessKey} /></div>
        <div className={'nameValue'}>{typeNameMap[accessKey]}</div>

        <style jsx>{`
            .bar {
                position: absolute;
                height: 97px;
                width: 10px;
                top: 90px;
            }

            .absoluteValue {
                color: #FFF;
                font-weight: bold;
                margin-left: -19px;
                top: -24px;
                width: 48px;
                font-size: 12px;
                text-align: center;
                position: absolute;
            }

            .nameValue {
                height: 30px;
                width: 220px;
                position: absolute; 
                top: 160px;
                left: 50%;
                transform: translateX(-50%);
                text-align: center;
                font-size: 14px;
                text-transform: uppercase;
                color: #FFF;
                font-weight: bold;
            }

            .typeContainer {
                position: absolute; 
                top: 40px;
                left: 50%;
                height: 150px;
                width: 200px;
                transform: translateX(-50%);
                padding: 40px 0;
                display: flex;
                justify-content: center;
            }

            .typeContainer img {
                height: 100%;
                object-fit: cover;
            }

            .bar-0 {
                left: 353px;
            }

            .bar-1 {
                left: 406px;
            }

            .bar-2 {
                left: 458px;
            }

            .bar-3 {
                left: 510px;
            }

            .bar-4 {
                left: 559px;
            }

            .bar-5 {
                right: 564px;
            }

            .bar-6 {
                right: 511px;
            }

            .bar-7 {
                right: 460px;
            }

            .bar-8 {
                right: 407px;
            }

            .bar-9 {
                right: 358px;
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