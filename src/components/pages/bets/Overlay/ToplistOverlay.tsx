import { ReactElement, Fragment } from "react";
import { BetOverlay } from "@streamdota/shared-types";
import classNames from "classnames";

const toplist = [
    {name: 'rmiLEtAnCI', total: 18, won: 16},
    {name: 'rarSeMeNthEAcyCL', total: 16, won: 15},
    {name: 'UrDrIblect', total: 18, won: 15},
    {name: 'DaRNATHRIo', total: 15, won: 14},
    {name: 'IfY', total: 16, won: 14},
    {name: 'thYSmaiNTerahAnd', total: 14, won: 13},
    {name: 'hesPEdenEW', total: 14, won: 12},
    {name: 'hurSTIoNtEareAdU', total: 11, won: 11},
    {name: 'rarSeMeNthEAcyCL', total: 10, won: 10},
    {name: 'rarSeMeNthEAcyCL', total: 10, won: 8},
]

interface Props {
    overlay: BetOverlay;
}

function getAccuracy(win, total): string {
    const acc = Math.round((win * 100) / total);
    return '' + acc;
}

export default function ToplistOverlay({overlay}: Props): ReactElement {

    return <div className={classNames('toplist', {rank: overlay.toplistShowRank})}>
        {toplist.map((user, idx) => <Fragment key={user.name}>
            {Boolean(overlay.toplistShowRank) && <div>{idx + 1}.</div>}
            <div className={'name'}>{user.name}</div>
            <div className={'result'}>
                {user.won}
                {Boolean(overlay.toplistShowTotalBets) && `/${user.total}`}
                {Boolean(overlay.toplistShowAccuracy) && ` (${getAccuracy(user.won, user.total)}%)`}
            </div>
        </Fragment>)}

        <style jsx>{`
            .toplist {
                background-color: ${overlay.toplistBackground};
                color: ${overlay.toplistFont};
                font-size: ${overlay.toplistFontSize}px;
                padding: .5em;
                line-height: 1em;
                display: grid;
                grid-template-columns: 1fr max-content;
                grid-row-gap: .25em;
            }

            .name {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space:nowrap;
            }

            .rank {
                grid-template-columns: max-content 1fr max-content;
            }

            .result {
                text-align: right;
            }
        `}</style>
    </div>;
}