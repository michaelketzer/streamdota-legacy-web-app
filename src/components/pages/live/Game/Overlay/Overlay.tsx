import { ReactElement, useState } from "react";
import { PlayerState } from "../Game";
import ValueBars from "./ValueBars";

export default function Overlay({playerState}: {playerState: PlayerState[]}): ReactElement {
    const [view, setView] = useState<keyof PlayerState>('net_worth');

    return <>
        <div className={'overlay'}>
            <div className={'previewContainer'}>
                <img src={'/images/game_stats.png'} className={'liveFeedImage'} />
            </div>
        </div>

        <ValueBars playerState={playerState} accessKey={view}/>

        <div className={'view'}>
            <select value={view} onChange={(e) => setView(e.target.value as keyof PlayerState)}>
                <option value={'net_worth'}>Net Worth</option>
                <option value={'kills'}>Kills</option>
                <option value={'gpm'}>GPM</option>
                <option value={'xpm'}>XPM</option>
                <option value={'hero_damage'}>Hero Damage</option>
                <option value={'runes_activated'}>Runes</option>
                <option value={'camps_stacked'}>Camps Stacked</option>
                <option value={'support_gold_spent'}>Support gold spent</option>
                <option value={'level'}>Level</option>
            </select>
        </div>

        <style jsx>{`
            .overlay {
                position: absolute;
                top: 80px;
                pointer-events: none;
            }
            .previewContainer {
                pointer-events: none;
            }
            .liveFeedImage {
                object-fit: cover;
                width: 100%;
                transform: scale(1.8);
                padding-top: 160px;
                z-index: 0;
                position: relative;
                pointer-events: none;
            }   

            .view {
                position: relative;
                z-index: 2;
            } 
        `}</style>
    </>;

}