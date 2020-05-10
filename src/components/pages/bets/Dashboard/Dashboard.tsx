import { ReactElement, useMemo } from "react";
import SimpleValueTile from "./SimpleValueTile";
import StatusTile from "./StatusTile";
import { useBetState } from "../BetContext/Context";
import TimingTile from "./TimingTile";
import BetDistribution from "../Categories/BetDistribution";

export default function Dashboard(): ReactElement {
    const [{chatters, status, bets, created, aBets, bBets}] = useBetState();
    const participation = useMemo(() => chatters > 0 ? Math.floor((bets * 100) / chatters) : 0, [bets, chatters]);

    return <div className={'dashboardGrid'}>
        <div className={'singleTile'}>
            <StatusTile status={status} />
        </div>
        <div className={'singleTile'}>
            <TimingTile created={created} status={status} />
        </div>
        <div className={'singleTile doubleTile'}>
            <BetDistribution aBets={aBets} bBets={bBets} bets={bets} />
        </div>
        <div className={'singleTile'}>
            <SimpleValueTile value={'' + bets} label={'Abstimmungen'} />
        </div>
        <div className={'singleTile'}>
            <SimpleValueTile value={`${participation}%`} label={'Chat Teilnahme'} />
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