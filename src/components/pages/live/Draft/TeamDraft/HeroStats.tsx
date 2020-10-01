import { ReactElement } from "react";
import { useAbortFetch } from "../../../../../hooks/abortFetch";
import { getDefaultHeader } from "../../../../../modules/middleware/Network";

interface HeroOverview {
    index: number;
    heroId: number;
    matchCount: number;
    matchWins: number;
    pickPhaseOne: number;
    pickPhaseTwo: number;
    pickPhaseThree: number;
    banCount: number;
    banPhaseOne: number;
    banPhaseTwo: number;
    banPhaseThree: number;
    totalGamesCount: number;
}

export async function fetchHeroStats(abortController: AbortController, leagueId: string, heroId: number): Promise<HeroOverview | null> {
    const response = await fetch(process.env.API_URL + `/casting/heroStats/${leagueId}/${heroId}`, {headers: getDefaultHeader(), signal: abortController.signal});
    if(response.ok) {
        return await response.json();
    }

    return null;
}
export default function HeroStats({id}: {id: number}): ReactElement {
    const [stats] = useAbortFetch(fetchHeroStats, +localStorage.getItem('leagueId'), id);
    const games = stats?.matchCount || 0;
    const wins = stats?.matchWins || 0;
    const totalGamesCount = stats?.totalGamesCount || 0;
    const winRate = games > 0 ? Math.floor(((wins) * 100) / games) : 0;
    const banRate = totalGamesCount > 0 ? Math.floor(((stats?.banCount || 0) * 100) / totalGamesCount) : 0;
    const pickRate = totalGamesCount > 0 ? Math.floor((games * 100) / totalGamesCount) : 0;

    return <div className={'stats'}>
        <div>
            <div className={'value'}>{wins}/{games} ({winRate}%)</div>
            <div>WINRATE</div>
        </div>
        <div>
            <div className={'value picks'}>{pickRate}%</div>
            <div>PICKS</div>
        </div>
        <div>
            <div className={'value bans'}>{banRate}%</div>
            <div>BANS</div>
        </div>

        <style jsx>{`
            .stats {
                display: grid;
                align-items: center;
                grid-template-columns: 1fr 1fr 1fr;
                flex-grow: 1;
            }

            .value {
                font-weight: bold;
            }    

            .picks {
                color: #5DB93C;
            }

            .bans {
                color: #D6342A;
            }
        `}</style>
    </div>;
}
