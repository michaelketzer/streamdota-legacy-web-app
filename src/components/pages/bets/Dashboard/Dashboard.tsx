import { ReactElement, useState, useMemo } from "react";
import SimpleValueTile from "./SimpleValueTile";
import StatusTile, { Status } from "./StatusTile";
import { BetRound } from "../../../../api/@types/BetRound";

export default function Dashboard(): ReactElement {
    const [status, setStatus] = useState<Status>(Status.ready);
    const [data] = useState<Partial<BetRound>>();

    const time = useMemo(() => {
        if(status === Status.ready) {
            return 'Warte auf Spiel';
        } else if(status === Status.started) {
            return '0:15';
        }

        return 'Abgelaufen';
    }, [status, data]);


    return <div className={'dashboardGrid'}>
        <div className={'singleTile'}>
            <StatusTile status={status} setStatus={setStatus} />
        </div>
        <div className={'singleTile'}>
            <SimpleValueTile value={time} label={'Zeit'} />
        </div>
        <div className={'singleTile doubleTile'} />
        <div className={'singleTile'}>
            <SimpleValueTile value={'43'} label={'Abstimmungen'} />
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