import { ReactElement, useState, useMemo } from "react";
import SimpleValueTile from "./SimpleValueTile";
import StatusTile from "./StatusTile";
import { useBetState } from "../BetContext/Context";
import TimingTile from "./TimingTile";

export default function Dashboard(): ReactElement {
    const [{status, bets, created, aBets, bBets}] = useBetState();

    return <div className={'dashboardGrid'}>
        <div className={'singleTile'}>
            <StatusTile status={status} />
        </div>
        <div className={'singleTile'}>
            <TimingTile created={created} status={status} />
        </div>
        <div className={'singleTile doubleTile'}>
            {aBets} / {bBets}
        </div>
        <div className={'singleTile'}>
            <SimpleValueTile value={'' + bets} label={'Abstimmungen'} />
        </div>
        <div className={'singleTile'}>
            <SimpleValueTile value={'12%'} label={'Chat Teilnahme'} />
        </div>

        <style jsx>{`
            .dashboardGrid {
                display: grid;
                grid-template-columns: minmax(280px, .3fr) minmax(280px, .3fr) .6fr;
                grid-gap: 50px;
                padding: 20px 0;
            }    

            .singleTile {
                grid-area: auto / auto / span 1 / span 1;
                background-color: #F5F5F5;
                border-radius: 8px;
                padding: 20px;
                text-transform: uppercase;
            }

            .doubleTile {
                grid-area: auto / auto / span 2 / span 1;
            }
        `}</style>
    </div>;
}